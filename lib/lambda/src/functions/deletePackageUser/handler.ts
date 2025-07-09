import { APIGatewayProxyEvent, APIGatewayProxyResult, Context } from 'aws-lambda';
import { DeletePackageUserService } from './services/deletePackageUser.service';
import { 
  createOkResponse, 
  createBadRequestResponse,
  createUnauthorizedResponse,
  createInternalServerErrorResponse,
  createNotFoundResponse,
  logError,
  logInfo,
  validateAuthorizationHeader 
} from '../../../layers/utils/nodejs/utils';

const FUNCTION_NAME = 'DeletePackageUserHandler';

/**
 * Handler principal de la función Lambda deletePackageUser
 */
export const handler = async (
  event: APIGatewayProxyEvent,
  context: Context
): Promise<APIGatewayProxyResult> => {
  logInfo(FUNCTION_NAME, 'Iniciando procesamiento de eliminación de paquete de usuario', {
    requestId: context.awsRequestId,
    httpMethod: event.httpMethod,
    path: event.path,
  });

  try {
    // Validar que sea DELETE
    if (event.httpMethod !== 'DELETE') {
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

    // Extraer ID del path parameter
    const packageUserId = event.pathParameters?.id;
    if (!packageUserId || isNaN(parseInt(packageUserId))) {
      return createBadRequestResponse('ID del paquete de usuario requerido y debe ser un número válido', event);
    }

    const id = parseInt(packageUserId);

    // Usar el servicio para eliminar el paquete
    const deletePackageUserService = new DeletePackageUserService();
    const result = await deletePackageUserService.deletePackageUser(id);

    logInfo(FUNCTION_NAME, 'Paquete de usuario eliminado exitosamente', {
      packageUserId: id,
      userId: authValidation.payload?.userId
    });

    return createOkResponse(result, result.message, event);

  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Error desconocido';
    
    // Manejar errores específicos
    if (errorMessage.includes('no encontrado')) {
      logInfo(FUNCTION_NAME, 'Paquete de usuario no encontrado', { error: errorMessage });
      return createNotFoundResponse(errorMessage, event);
    }

    if (errorMessage.includes('inválido') || errorMessage.includes('debe ser')) {
      logInfo(FUNCTION_NAME, 'Error de validación', { error: errorMessage });
      return createBadRequestResponse(errorMessage, event);
    }

    logError(FUNCTION_NAME, error instanceof Error ? error : 'Error desconocido', {
      requestId: context.awsRequestId,
      event: {
        httpMethod: event.httpMethod,
        path: event.path,
        pathParameters: event.pathParameters,
      },
    });

    return createInternalServerErrorResponse(errorMessage, event);
  }
}; 