import { APIGatewayProxyEvent, APIGatewayProxyResult, Context } from 'aws-lambda';
import { ListUserAdminsService } from './services/listUserAdmins.service';
import { ListUserAdminsQueryParams } from './dtos/listUserAdmins.dto';
import { 
  createOkResponse,
  createInternalServerErrorResponse,
  createUnauthorizedResponse,
  logError,
  logInfo,
  validateAuthorizationHeader
} from '../../../layers/utils/nodejs/utils';

const FUNCTION_NAME = 'ListUserAdminsHandler';

/**
 * Handler principal de la función Lambda listUserAdmins
 */
export const handler = async (
  event: APIGatewayProxyEvent,
  context: Context
): Promise<APIGatewayProxyResult> => {
  logInfo(FUNCTION_NAME, 'Iniciando procesamiento de lista de usuarios administradores', {
    requestId: context.awsRequestId,
    httpMethod: event.httpMethod,
    path: event.path,
    queryStringParameters: event.queryStringParameters,
  });

  try {
    // Validar que sea GET
    if (event.httpMethod !== 'GET') {
      return createInternalServerErrorResponse('Método HTTP no permitido', event);
    }

    // Validar JWT desde el header Authorization
    const authResult = validateAuthorizationHeader(
      event.headers?.['Authorization'] || event.headers?.['authorization'],
      ['administrador'] // Solo administradores pueden ver lista de usuarios
    );

    if (!authResult.isValid) {
      logInfo(FUNCTION_NAME, 'Token de autorización inválido', { 
        error: authResult.error 
      });
      return createUnauthorizedResponse(authResult.error || 'Token inválido', event);
    }

    logInfo(FUNCTION_NAME, 'Usuario autorizado', {
      userId: authResult.payload?.userId,
      username: authResult.payload?.username,
      role: authResult.payload?.roleName
    });

    // Extraer query parameters
    const queryParams: ListUserAdminsQueryParams = {
      search: event.queryStringParameters?.search || undefined,
      roleId: event.queryStringParameters?.roleId || undefined,
      page: event.queryStringParameters?.page || undefined,
      limit: event.queryStringParameters?.limit || undefined,
    };

    logInfo(FUNCTION_NAME, 'Query parameters extraídos', { queryParams });

    // Usar el servicio para obtener los usuarios administradores
    const service = new ListUserAdminsService();
    const result = await service.getUserAdmins(queryParams);

    logInfo(FUNCTION_NAME, 'Usuarios administradores obtenidos exitosamente', {
      totalItems: result.pagination.totalItems,
      currentPage: result.pagination.currentPage,
      totalPages: result.pagination.totalPages,
      usersReturned: result.items.length,
    });

    return createOkResponse(result, 'Usuarios administradores obtenidos exitosamente', event);

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