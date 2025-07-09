import { APIGatewayProxyEvent, APIGatewayProxyResult, Context } from 'aws-lambda';
import { DeletePackageTypeService } from './services/deletePackageType.service';
import { DeletePackageTypeRequest } from './dtos/deletePackageType.dto';
import { 
  createOkResponse, 
  createBadRequestResponse,
  createInternalServerErrorResponse,
  createNotFoundResponse,
  createConflictResponse,
  createUnauthorizedResponse,
  createForbiddenResponse,
  validateAuthorizationHeader,
  logError,
  logInfo 
} from '../../../layers/utils/nodejs/utils';

const FUNCTION_NAME = 'DeletePackageTypeHandler';

/**
 * Handler principal de la función Lambda deletePackageType
 */
export const handler = async (
  event: APIGatewayProxyEvent,
  context: Context
): Promise<APIGatewayProxyResult> => {
  logInfo(FUNCTION_NAME, 'Iniciando procesamiento de eliminación de tipo de paquete', {
    requestId: context.awsRequestId,
    httpMethod: event.httpMethod,
    path: event.path,
  });

  try {
    // Validar que sea DELETE
    if (event.httpMethod !== 'DELETE') {
      return createBadRequestResponse('Método HTTP no permitido', event);
    }

    // Validar JWT Token y permisos de administrador
    const authHeader = event.headers.Authorization || event.headers.authorization;
    const authValidation = validateAuthorizationHeader(authHeader, ['administrador']);
    
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

    const requestData: DeletePackageTypeRequest = { id };

    // Usar el servicio para eliminar el tipo de paquete
    const deletePackageTypeService = new DeletePackageTypeService();
    const result = await deletePackageTypeService.deletePackageType(requestData);

    // Manejo de respuestas basado en el resultado del stored procedure
    if (result.success) {
      logInfo(FUNCTION_NAME, 'Tipo de paquete eliminado exitosamente', {
        id: id,
        message: result.message
      });

      return createOkResponse(result, result.message, event);
    } else {
      // El stored procedure retornó false, determinar el tipo de error
      logInfo(FUNCTION_NAME, 'No se pudo eliminar el tipo de paquete', {
        id: id,
        reason: result.message
      });

      if (result.message.includes('no encontrado')) {
        return createNotFoundResponse(result.message, event);
      } else if (result.message.includes('tiene paquetes asociados') || result.message.includes('dependencias')) {
        return createConflictResponse(result.message, event);
      } else {
        return createBadRequestResponse(result.message, event);
      }
    }

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
    if (errorMessage.includes('requerido') || errorMessage.includes('debe ser')) {
      return createBadRequestResponse(errorMessage, event);
    }

    return createInternalServerErrorResponse(errorMessage, event);
  }
}; 