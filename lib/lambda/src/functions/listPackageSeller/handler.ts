import { APIGatewayProxyEvent, APIGatewayProxyResult, Context } from 'aws-lambda';
import { ListPackageSellerService } from './services/listPackageSeller.service';
import { ListPackageSellerRequest } from './dtos/listPackageSeller.dto';
import { 
  createOkResponse, 
  createBadRequestResponse,
  createInternalServerErrorResponse,
  createUnauthorizedResponse,
  createForbiddenResponse,
  validateAuthorizationHeader,
  logError,
  logInfo 
} from '../../../layers/utils/nodejs/utils';

const FUNCTION_NAME = 'ListPackageSellerHandler';

/**
 * Handler principal de la función Lambda listPackageSeller
 */
export const handler = async (
  event: APIGatewayProxyEvent,
  context: Context
): Promise<APIGatewayProxyResult> => {
  logInfo(FUNCTION_NAME, 'Iniciando procesamiento de listado de paquetes vendedor', {
    requestId: context.awsRequestId,
    httpMethod: event.httpMethod,
    path: event.path,
  });

  try {
    // Validar que sea GET
    if (event.httpMethod !== 'GET') {
      return createBadRequestResponse('Método HTTP no permitido', event);
    }

    // Validar JWT Token y permisos de administrador
    const authHeader = event.headers.Authorization || event.headers.authorization;
    const authValidation = validateAuthorizationHeader(authHeader, ['administrador', 'gestor de contenido multimedia', 'vendedor', 'revendedor']);
    
    
    if (!authValidation.isValid) {
      if (authValidation.error?.includes('Token')) {
        return createUnauthorizedResponse(authValidation.error, event);
      } else {
        return createForbiddenResponse(authValidation.error || 'Acceso denegado', event);
      }
    }

    // Extraer parámetros de query
    const queryParams = event.queryStringParameters || {};
    const requestData: ListPackageSellerRequest = {
      search: queryParams.search && queryParams.search.trim() !== '' ? queryParams.search.trim() : undefined,
      page: queryParams.page ? parseInt(queryParams.page) : undefined,
      pageSize: queryParams.pageSize ? parseInt(queryParams.pageSize) : undefined
    };

    // Validar parámetros numéricos si están presentes
    if (requestData.page !== undefined && (isNaN(requestData.page) || requestData.page < 1)) {
      return createBadRequestResponse('El parámetro page debe ser un número entero positivo', event);
    }

    if (requestData.pageSize !== undefined && (isNaN(requestData.pageSize) || requestData.pageSize < 1 || requestData.pageSize > 100)) {
      return createBadRequestResponse('El parámetro pageSize debe ser un número entero entre 1 y 100', event);
    }

    // Usar el servicio para listar paquetes vendedor
    const listPackageSellerService = new ListPackageSellerService();
    const result = await listPackageSellerService.listPackageSeller(requestData);

    logInfo(FUNCTION_NAME, 'Listado de paquetes vendedor completado exitosamente', {
      itemsCount: result.items.length,
      totalCount: result.pagination.totalCount,
      page: result.pagination.page,
      totalPages: result.pagination.totalPages,
      search: requestData.search
    });

    return createOkResponse(result, 'Paquetes vendedor obtenidos exitosamente', event);

  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Error desconocido';
    
    logError(FUNCTION_NAME, error instanceof Error ? error : 'Error desconocido', {
      requestId: context.awsRequestId,
      event: {
        httpMethod: event.httpMethod,
        path: event.path,
        queryStringParameters: event.queryStringParameters
      },
    });

    // Manejar errores específicos
    if (errorMessage.includes('página') || errorMessage.includes('parámetro')) {
      return createBadRequestResponse(errorMessage, event);
    }

    return createInternalServerErrorResponse(errorMessage, event);
  }
}; 