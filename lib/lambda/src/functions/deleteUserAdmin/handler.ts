import { APIGatewayProxyEvent, APIGatewayProxyResult, Context } from 'aws-lambda';
import { DeleteUserAdminService } from './services/deleteUserAdmin.service';
import { 
  createOkResponse, 
  createBadRequestResponse,
  createNotFoundResponse,
  createUnauthorizedResponse,
  createForbiddenResponse,
  createInternalServerErrorResponse,
  validateAuthorizationHeader,
  logError,
  logInfo 
} from '../../../layers/utils/nodejs/utils';

const FUNCTION_NAME = 'DeleteUserAdminHandler';

/**
 * Handler principal de la función Lambda deleteUserAdmin
 */
export const handler = async (
  event: APIGatewayProxyEvent,
  context: Context
): Promise<APIGatewayProxyResult> => {
  logInfo(FUNCTION_NAME, 'Iniciando procesamiento de eliminación de usuario admin', {
    requestId: context.awsRequestId,
    httpMethod: event.httpMethod,
    path: event.path,
    pathParameters: event.pathParameters
  });

  try {
    // Validar que sea DELETE
    if (event.httpMethod !== 'DELETE') {
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

    // Usar el servicio para eliminar el usuario
    const deleteUserAdminService = new DeleteUserAdminService();
    
    // TODO: Implementar validación de permisos cuando se agregue el método validateDeletePermissions al servicio
    // const targetUserIdNum = parseInt(userId, 10);
    // if (!isNaN(targetUserIdNum)) {
    //   const permissionCheck = deleteUserAdminService.validateDeletePermissions(
    //     authResult.payload!.userId,
    //     targetUserIdNum,
    //     authResult.payload!.roleName
    //   );

    //   if (!permissionCheck.hasPermissions) {
    //     logInfo(FUNCTION_NAME, 'Permisos insuficientes para eliminación', {
    //       requestingUserId: authResult.payload!.userId,
    //       targetUserId: targetUserIdNum,
    //       requestingUserRole: authResult.payload!.roleName,
    //       error: permissionCheck.error
    //     });
    //     return createForbiddenResponse(permissionCheck.error!, event);
    //   }
    // }

    // Eliminar el usuario
    const result = await deleteUserAdminService.deleteUserAdmin(userId);

    if (!result.success) {
      // Determinar el tipo de error apropiado
      if (result.error?.includes('no encontrado')) {
        return createNotFoundResponse(result.error, event);
      } else {
        return createBadRequestResponse(result.error!, event);
      }
    }



    return createOkResponse(result.data, 'Usuario admin eliminado exitosamente', event);

  } catch (error) {

    return createInternalServerErrorResponse(
      error instanceof Error ? error.message : 'Error interno del servidor',
      event
    );
  }
}; 