import { APIGatewayProxyEvent, APIGatewayProxyResult, Context } from 'aws-lambda';
import { ChangePackageUserStatusService } from './services/changePackageUserStatus.service';
import { ChangePackageUserStatusRequest } from './dtos/changePackageUserStatus.dto';
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

const FUNCTION_NAME = 'ChangePackageUserStatusHandler';

/**
 * Handler principal de la función Lambda changePackageUserStatus
 */
export const handler = async (
  event: APIGatewayProxyEvent,
  context: Context
): Promise<APIGatewayProxyResult> => {
  logInfo(FUNCTION_NAME, 'Iniciando procesamiento de cambio de status de paquete de usuario', {
    requestId: context.awsRequestId,
    httpMethod: event.httpMethod,
    path: event.path,
  });

  try {
    // Validar que sea PATCH
    if (event.httpMethod !== 'PATCH') {
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
    const statusData = parseRequestBody<ChangePackageUserStatusRequest>(event.body);
    if (!statusData) {
      return createBadRequestResponse('Cuerpo de la petición requerido', event);
    }

    // Validar que el status esté presente
    if (statusData.status === undefined || statusData.status === null) {
      return createBadRequestResponse('El campo "status" es requerido', event);
    }

    // Usar el servicio para cambiar el status
    const changePackageUserStatusService = new ChangePackageUserStatusService();
    const result = await changePackageUserStatusService.changePackageUserStatus(id, statusData);

    logInfo(FUNCTION_NAME, 'Status del paquete de usuario cambiado exitosamente', {
      packageUserId: result.id,
      newStatus: result.status,
      statusText: result.status === 1 ? 'activo' : 'inactivo',
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

    if (errorMessage.includes('inválido') || 
        errorMessage.includes('debe ser') || 
        errorMessage.includes('es requerido')) {
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