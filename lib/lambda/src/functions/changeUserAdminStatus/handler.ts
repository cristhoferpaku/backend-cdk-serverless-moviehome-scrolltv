import { APIGatewayProxyEvent, APIGatewayProxyResult, Context } from 'aws-lambda';
import { ChangeUserAdminStatusService } from './services/changeUserAdminStatus.service';
import { ChangeUserAdminStatusBody } from './dtos/changeUserAdminStatus.dto';
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

const FUNCTION_NAME = 'ChangeUserAdminStatusHandler';

/**
 * Handler principal de la función Lambda changeUserAdminStatus
 */
export const handler = async (
  event: APIGatewayProxyEvent,
  context: Context
): Promise<APIGatewayProxyResult> => {
  logInfo(FUNCTION_NAME, 'Iniciando procesamiento de cambio de status de usuario admin', {
    requestId: context.awsRequestId,
    httpMethod: event.httpMethod,
    path: event.path,
    pathParameters: event.pathParameters
  });

  try {
    // Validar que sea PATCH
    if (event.httpMethod !== 'PATCH') {
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
    const statusData = parseRequestBody<ChangeUserAdminStatusBody>(event.body);
    if (!statusData) {
      return createBadRequestResponse('Cuerpo de la petición requerido', event);
    }

    // Validar que el status esté presente en el body
    if (statusData.status === undefined || statusData.status === null) {
      return createBadRequestResponse('Status es requerido en el cuerpo de la petición', event);
    }

    // Usar el servicio para cambiar el status del usuario
    const changeUserAdminStatusService = new ChangeUserAdminStatusService();
    // Cambiar el status del usuario
    const result = await changeUserAdminStatusService.changeUserAdminStatus(userId, statusData);

    if (!result.success) {
      logInfo(FUNCTION_NAME, 'Error al cambiar status de usuario admin', { 
        userId, 
        newStatus: statusData.status,
        error: result.error 
      });

      // Determinar el tipo de error apropiado
      if (result.error?.includes('no encontrado')) {
        return createNotFoundResponse(result.error, event);
      } else if (result.error?.includes('Status debe ser') || result.error?.includes('requerido') || result.error?.includes('debe ser un número')) {
        return createValidationErrorResponse('Error de validación', [result.error], event);
      } else {
        return createBadRequestResponse(result.error!, event);
      }
    }

    const statusDescription = changeUserAdminStatusService.getStatusDescription(result.data!.status);


    return createOkResponse(result.data, `Status cambiado exitosamente a ${statusDescription}`, event);

  } catch (error) {


    return createInternalServerErrorResponse(
      error instanceof Error ? error.message : 'Error interno del servidor',
      event
    );
  }
}; 