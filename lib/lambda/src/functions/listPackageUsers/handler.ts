import { APIGatewayProxyEvent, APIGatewayProxyResult, Context } from 'aws-lambda';
import { ListPackageUsersService } from './services/listPackageUsers.service';
import { ListPackageUsersRequest } from './dtos/listPackageUsers.dto';
import { 
  createOkResponse, 
  createBadRequestResponse,
  createUnauthorizedResponse,
  createInternalServerErrorResponse,
  logError,
  logInfo,
  validateAuthorizationHeader 
} from '../../../layers/utils/nodejs/utils';

const FUNCTION_NAME = 'ListPackageUsersHandler';

/**
 * Handler principal de la función Lambda listPackageUsers
 */
export const handler = async (
  event: APIGatewayProxyEvent,
  context: Context
): Promise<APIGatewayProxyResult> => {
  logInfo(FUNCTION_NAME, 'Iniciando procesamiento de listado de paquetes de usuario', {
    requestId: context.awsRequestId,
    httpMethod: event.httpMethod,
    path: event.path,
  });

  try {
    // Validar que sea GET
    if (event.httpMethod !== 'GET') {
      return createBadRequestResponse('Método HTTP no permitido', event);
    }

    // Validar autorización JWT
    const authValidation = validateAuthorizationHeader(
      event.headers.Authorization || event.headers.authorization,
      ['administrador', 'gestor de contenido multimedia'] // Roles permitidos
    );

    if (!authValidation.isValid) {
      logInfo(FUNCTION_NAME, 'Acceso no autorizado', { error: authValidation.error });
      return createUnauthorizedResponse(authValidation.error || 'No autorizado', event);
    }

    // Extraer parámetros de query
    const queryParams = event.queryStringParameters || {};
    const request: ListPackageUsersRequest = {
      search: queryParams.search,
      page: queryParams.page ? parseInt(queryParams.page) : undefined,
      limit: queryParams.limit ? parseInt(queryParams.limit) : undefined,
    };

    // Validar parámetros numéricos
    if (request.page !== undefined && (isNaN(request.page) || request.page < 1)) {
      return createBadRequestResponse('El parámetro "page" debe ser un número mayor a 0', event);
    }

    if (request.limit !== undefined && (isNaN(request.limit) || request.limit < 1 || request.limit > 100)) {
      return createBadRequestResponse('El parámetro "limit" debe ser un número entre 1 y 100', event);
    }

    // Usar el servicio para obtener los paquetes
    const listPackageUsersService = new ListPackageUsersService();
    const result = await listPackageUsersService.listPackageUsers(request);

    logInfo(FUNCTION_NAME, 'Listado de paquetes de usuario obtenido exitosamente', {
      totalItems: result.pagination.total,
      page: result.pagination.page,
      limit: result.pagination.limit,
      userId: authValidation.payload?.userId
    });

    return createOkResponse(result, 'Paquetes de usuario obtenidos exitosamente', event);

  } catch (error) {
    logError(FUNCTION_NAME, error instanceof Error ? error : 'Error desconocido', {
      requestId: context.awsRequestId,
      event: {
        httpMethod: event.httpMethod,
        path: event.path,
        queryStringParameters: event.queryStringParameters,
      },
    });

    return createInternalServerErrorResponse(
      error instanceof Error ? error.message : 'Error interno del servidor',
      event
    );
  }
}; 