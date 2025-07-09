import { APIGatewayProxyEvent, APIGatewayProxyResult, Context } from 'aws-lambda';
import { RefreshTokenService } from './services/refreshToken.service';
import { RefreshTokenRequest } from './dtos/refreshToken.dto';
import { 
  createOkResponse, 
  createBadRequestResponse,
  createUnauthorizedResponse,
  createInternalServerErrorResponse,
  parseRequestBody,
  validateRequiredFields,
  logError,
  logInfo 
} from '../../../layers/utils/nodejs/utils';

const FUNCTION_NAME = 'RefreshTokenHandler';

/**
 * Handler principal de la función Lambda refreshToken
 */
export const handler = async (
  event: APIGatewayProxyEvent,
  context: Context
): Promise<APIGatewayProxyResult> => {
  logInfo(FUNCTION_NAME, 'Iniciando procesamiento de refresh token', {
    requestId: context.awsRequestId,
    httpMethod: event.httpMethod,
    path: event.path,
  });

  try {
    // Validar que sea POST
    if (event.httpMethod !== 'POST') {
      return createBadRequestResponse('Método HTTP no permitido', event);
    }

    // Parsear el body
    const refreshData = parseRequestBody<RefreshTokenRequest>(event.body);
    if (!refreshData) {
      return createBadRequestResponse('Cuerpo de la petición requerido', event);
    }

    // Validar campos requeridos
    const requiredFields = ['refreshToken'];
    const validationErrors = validateRequiredFields(refreshData, requiredFields);

    if (validationErrors.length > 0) {
      return createBadRequestResponse('Refresh token es requerido', event);
    }

    // Usar el servicio para refrescar el token
    const refreshTokenService = new RefreshTokenService();
    const refreshResult = await refreshTokenService.refreshToken(refreshData.refreshToken);

    if (!refreshResult) {
      logInfo(FUNCTION_NAME, 'Refresh token inválido o expirado', { refreshToken: refreshData.refreshToken });
      return createUnauthorizedResponse('Refresh token inválido o expirado', event);
    }

    logInfo(FUNCTION_NAME, 'Refresh token exitoso', {
      userId: refreshResult.user.id,
      username: refreshResult.user.username,
    });

    return createOkResponse(refreshResult, 'Token refrescado exitosamente', event);

  } catch (error) {
    logError(FUNCTION_NAME, error instanceof Error ? error : 'Error desconocido', {
      requestId: context.awsRequestId,
      event: {
        httpMethod: event.httpMethod,
        path: event.path,
      },
    });

    return createInternalServerErrorResponse(
      error instanceof Error ? error.message : 'Error interno del servidor',
      event
    );
  }
}; 