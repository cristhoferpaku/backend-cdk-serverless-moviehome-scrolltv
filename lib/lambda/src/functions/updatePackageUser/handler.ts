import { APIGatewayProxyEvent, APIGatewayProxyResult, Context } from 'aws-lambda';
import { UpdatePackageUserService } from './services/updatePackageUser.service';
import { UpdatePackageUserRequest } from './dtos/updatePackageUser.dto';
import { 
  createOkResponse, 
  createBadRequestResponse,
  createUnauthorizedResponse,
  createInternalServerErrorResponse,
  createNotFoundResponse,
  parseRequestBody,
  logError,
  logInfo,
  validateAuthorizationHeader 
} from '../../../layers/utils/nodejs/utils';

const FUNCTION_NAME = 'UpdatePackageUserHandler';

/**
 * Handler principal de la función Lambda updatePackageUser
 */
export const handler = async (
  event: APIGatewayProxyEvent,
  context: Context
): Promise<APIGatewayProxyResult> => {
  logInfo(FUNCTION_NAME, 'Iniciando procesamiento de actualización de paquete de usuario', {
    requestId: context.awsRequestId,
    httpMethod: event.httpMethod,
    path: event.path,
  });

  try {
    // Validar que sea PUT
    if (event.httpMethod !== 'PUT') {
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

    // Parsear el body
    const updateData = parseRequestBody<UpdatePackageUserRequest>(event.body);
    if (!updateData) {
      return createBadRequestResponse('Cuerpo de la petición requerido', event);
    }

    // Validar que al menos un campo esté presente
    const hasValidFields = Object.keys(updateData).some(key => {
      const value = updateData[key as keyof UpdatePackageUserRequest];
      return value !== undefined && value !== null && value !== '';
    });

    if (!hasValidFields) {
      return createBadRequestResponse('Debe proporcionar al menos un campo para actualizar', event);
    }

    // Usar el servicio para actualizar el paquete
    const updatePackageUserService = new UpdatePackageUserService();
    const result = await updatePackageUserService.updatePackageUser(id, updateData);

    logInfo(FUNCTION_NAME, 'Paquete de usuario actualizado exitosamente', {
      packageUserId: result.id,
      updatedFields: Object.keys(updateData),
      userId: authValidation.payload?.userId
    });

    return createOkResponse(result, 'Paquete de usuario actualizado exitosamente', event);

  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Error desconocido';
    
    // Manejar errores específicos
    if (errorMessage.includes('no encontrado')) {
      logInfo(FUNCTION_NAME, 'Paquete de usuario no encontrado', { error: errorMessage });
      return createNotFoundResponse(errorMessage, event);
    }

    if (errorMessage.includes('ya existe') || 
        errorMessage.includes('debe ser') || 
        errorMessage.includes('no puede estar') ||
        errorMessage.includes('debe proporcionar')) {
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