import { APIGatewayProxyEvent, APIGatewayProxyResult, Context } from 'aws-lambda';
import { GetPackageTypeByIdService } from './services/getPackageTypeById.service';
import { GetPackageTypeByIdRequest } from './dtos/getPackageTypeById.dto';
import { 
  createOkResponse, 
  createBadRequestResponse,
  createInternalServerErrorResponse,
  createNotFoundResponse,
  createUnauthorizedResponse,
  createForbiddenResponse,
  validateAuthorizationHeader,
  logError,
} from '../../../layers/utils/nodejs/utils';

const FUNCTION_NAME = 'GetPackageTypeByIdHandler';

/**
 * Handler principal de la función Lambda getPackageTypeById
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
    const authValidation = validateAuthorizationHeader(authHeader, ['administrador', 'gestor de contenido multimedia']);
    
    if (!authValidation.isValid) {
      if (authValidation.error?.includes('Token')) {
        return createUnauthorizedResponse(authValidation.error, event);
      } else {
        return createForbiddenResponse(authValidation.error || 'Acceso denegado', event);
      }
    }

    // Extraer ID del path parameter
    const pathParameters = event.pathParameters || {};
    const idParam = pathParameters.id;

    if (!idParam) {
      return createBadRequestResponse('El ID del tipo de paquete es requerido en la URL', event);
    }

    // Convertir y validar el ID
    const id = parseInt(idParam);
    if (isNaN(id) || id <= 0) {
      return createBadRequestResponse('El ID del tipo de paquete debe ser un número entero positivo', event);
    }

    const requestData: GetPackageTypeByIdRequest = { id };

    // Usar el servicio para obtener el tipo de paquete
    const getPackageTypeByIdService = new GetPackageTypeByIdService();
    const result = await getPackageTypeByIdService.getPackageTypeById(requestData);


    return createOkResponse(result, 'Tipo de paquete obtenido exitosamente', event);

  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Error desconocido';
    
    logError(FUNCTION_NAME, error instanceof Error ? error : 'Error desconocido', {
      requestId: context.awsRequestId,
      event: {
        httpMethod: event.httpMethod,
        path: event.path,
        pathParameters: event.pathParameters
      },
    });

    // Manejar errores específicos
    if (errorMessage.includes('no encontrado')) {
      return createNotFoundResponse(errorMessage, event);
    }

    if (errorMessage.includes('requerido') || errorMessage.includes('debe ser')) {
      return createBadRequestResponse(errorMessage, event);
    }

    return createInternalServerErrorResponse(errorMessage, event);
  }
}; 