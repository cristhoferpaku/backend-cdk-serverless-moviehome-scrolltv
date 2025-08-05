import { APIGatewayProxyEvent, APIGatewayProxyResult, Context } from 'aws-lambda';
import { ListPackageTypesService } from './services/listPackageTypes.service';
import { ListPackageTypesRequest } from './dtos/listPackageTypes.dto';
import { 
  createOkResponse, 
  createBadRequestResponse,
  createInternalServerErrorResponse,
  createUnauthorizedResponse,
  createForbiddenResponse,
  validateAuthorizationHeader,
} from '../../../layers/utils/nodejs/utils';


/**
 * Handler principal de la función Lambda listPackageTypes
 */
export const handler = async (
  event: APIGatewayProxyEvent,
  context: Context
): Promise<APIGatewayProxyResult> => {
 

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
    const requestData: ListPackageTypesRequest = {
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

    // Usar el servicio para listar tipos de paquetes
    const listPackageTypesService = new ListPackageTypesService();
    const result = await listPackageTypesService.listPackageTypes(requestData);

    return createOkResponse(result, 'Tipos de paquetes obtenidos exitosamente', event);

  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Error desconocido';

    
   

    // Manejar errores específicos
    if (errorMessage.includes('página') || errorMessage.includes('parámetro')) {
      return createBadRequestResponse(errorMessage, event);
    }

    return createInternalServerErrorResponse(errorMessage, event);
  }
}; 