import { APIGatewayProxyEvent, APIGatewayProxyResult, Context } from 'aws-lambda';
import { GetUserAdminByIdService } from './services/getUserAdminById.service';
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

const FUNCTION_NAME = 'GetUserAdminByIdHandler';

/**
 * Handler principal de la función Lambda getUserAdminById
 */
export const handler = async (
  event: APIGatewayProxyEvent,
  context: Context
): Promise<APIGatewayProxyResult> => {
  logInfo(FUNCTION_NAME, 'Iniciando procesamiento de obtener usuario admin por ID', {
    requestId: context.awsRequestId,
    httpMethod: event.httpMethod,
    path: event.path,
    pathParameters: event.pathParameters
  });

  try {
    // Validar que sea GET
    if (event.httpMethod !== 'GET') {
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

    // Usar el servicio para obtener el usuario
    const getUserAdminByIdService = new GetUserAdminByIdService();
    


    // Obtener el usuario
    const userAdmin = await getUserAdminByIdService.getUserAdminById(userId);

    if (!userAdmin) {
      logInfo(FUNCTION_NAME, 'Usuario admin no encontrado', { userId });
      return createNotFoundResponse('Usuario admin no encontrado', event);
    }

    logInfo(FUNCTION_NAME, 'Usuario admin obtenido exitosamente', {
      userId: userAdmin.id,
      username: userAdmin.username,
      requestedBy: authResult.payload!.username
    });

    return createOkResponse(userAdmin, 'Usuario admin obtenido exitosamente', event);

  } catch (error) {
    logError(FUNCTION_NAME, error instanceof Error ? error : 'Error desconocido', {
      requestId: context.awsRequestId,
      event: {
        httpMethod: event.httpMethod,
        path: event.path,
        pathParameters: event.pathParameters
      },
    });

    return createInternalServerErrorResponse(
      error instanceof Error ? error.message : 'Error interno del servidor',
      event
    );
  }
}; 