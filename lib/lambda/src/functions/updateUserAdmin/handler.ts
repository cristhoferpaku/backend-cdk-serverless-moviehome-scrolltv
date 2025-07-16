import { APIGatewayProxyEvent, APIGatewayProxyResult, Context } from 'aws-lambda';
import { UpdateUserAdminService } from './services/updateUserAdmin.service';
import { UpdateUserAdminBody } from './dtos/updateUserAdmin.dto';
import { 
  createOkResponse, 
  createBadRequestResponse,
  createNotFoundResponse,
  createUnauthorizedResponse,
  createForbiddenResponse,
  createInternalServerErrorResponse,
  createValidationErrorResponse,
  validateAuthorizationHeader,
  parseRequestBody,
  logError,
  logInfo 
} from '../../../layers/utils/nodejs/utils';

const FUNCTION_NAME = 'UpdateUserAdminHandler';

/**
 * Handler principal de la función Lambda updateUserAdmin
 */
export const handler = async (
  event: APIGatewayProxyEvent,
  context: Context
): Promise<APIGatewayProxyResult> => {
  logInfo(FUNCTION_NAME, 'Iniciando procesamiento de actualización de usuario admin', {
    requestId: context.awsRequestId,
    httpMethod: event.httpMethod,
    path: event.path,
    pathParameters: event.pathParameters
  });

  try {
    // Validar que sea PUT
    if (event.httpMethod !== 'PUT') {
      return createBadRequestResponse('Método HTTP no permitido', event);
    }

    // Validar autorización JWT
    const authResult = validateAuthorizationHeader(
      event.headers?.Authorization || event.headers?.authorization,
      ['administrador', 'gestor de contenido multimedia', 'vendedor', 'revendedor'] // Permitir a todos los roles autenticados
    );

    if (!authResult.isValid) {
      return createUnauthorizedResponse(authResult.error || 'Token de autorización inválido', event);
    }

    // Obtener el ID desde path parameters
    const userId = event.pathParameters?.id;
    if (!userId) {
      return createBadRequestResponse('ID de usuario es requerido en la URL', event);
    }

    // Parsear el body
    const updateData = parseRequestBody<UpdateUserAdminBody>(event.body);
    if (!updateData) {
      return createBadRequestResponse('Cuerpo de la petición requerido', event);
    }

    // Usar el servicio para actualizar el usuario
    const updateUserAdminService = new UpdateUserAdminService();
    

    // Actualizar el usuario
    const result = await updateUserAdminService.updateUserAdmin(userId, updateData);

    if (!result.success) {
      logInfo(FUNCTION_NAME, 'Error al actualizar usuario admin', { 
        userId, 
        error: result.error 
      });

      // Determinar el tipo de error apropiado
      if (result.error?.includes('no encontrado')) {
        return createNotFoundResponse(result.error, event);
      } else if (result.error?.includes('validación') || result.error?.includes('requerido') || result.error?.includes('debe ser')) {
        return createValidationErrorResponse('Error de validación', [result.error], event);
      } else {
        return createBadRequestResponse(result.error!, event);
      }
    }

    logInfo(FUNCTION_NAME, 'Usuario admin actualizado exitosamente', {
      userId: result.data!.id,
      username: result.data!.username,
      updatedBy: authResult.payload!.username,
      fieldsUpdated: Object.keys(updateData).filter(key => updateData[key as keyof UpdateUserAdminBody] !== undefined)
    });

    return createOkResponse(result.data, 'Usuario admin actualizado exitosamente', event);

  } catch (error) {
    logError(FUNCTION_NAME, error instanceof Error ? error : 'Error desconocido', {
      requestId: context.awsRequestId,
      event: {
        httpMethod: event.httpMethod,
        path: event.path,
        pathParameters: event.pathParameters,
        body: event.body
      },
    });

    return createInternalServerErrorResponse(
      error instanceof Error ? error.message : 'Error interno del servidor',
      event
    );
  }
}; 