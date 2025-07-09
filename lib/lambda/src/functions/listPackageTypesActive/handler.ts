import { APIGatewayProxyEvent, APIGatewayProxyResult, Context } from 'aws-lambda';
import { ListPackageTypesActiveService } from './services/listPackageTypesActive.service';
import { 
  createOkResponse,
  createInternalServerErrorResponse,
  createUnauthorizedResponse,
  logError,
  logInfo,
  validateAuthorizationHeader
} from '../../../layers/utils/nodejs/utils';

const FUNCTION_NAME = 'ListPackageTypesActiveHandler';

/**
 * Handler principal de la función Lambda listPackageTypesActive
 */
export const handler = async (
  event: APIGatewayProxyEvent,
  context: Context
): Promise<APIGatewayProxyResult> => {
  logInfo(FUNCTION_NAME, 'Iniciando procesamiento de lista de tipos de paquetes activos', {
    requestId: context.awsRequestId,
    httpMethod: event.httpMethod,
    path: event.path,
  });

  try {
    // Validar que sea GET
    if (event.httpMethod !== 'GET') {
      return createInternalServerErrorResponse('Método HTTP no permitido', event);
    }

    // Validar JWT desde el header Authorization
    const authResult = validateAuthorizationHeader(
      event.headers?.['Authorization'] || event.headers?.['authorization'],
      ['administrador', 'gestor de contenido multimedia'] // Roles permitidos
    );

    if (!authResult.isValid) {
      logInfo(FUNCTION_NAME, 'Token de autorización inválido', { 
        error: authResult.error 
      });
      return createUnauthorizedResponse(authResult.error || 'Token inválido', event);
    }

    logInfo(FUNCTION_NAME, 'Usuario autorizado', {
      userId: authResult.payload?.userId,
      username: authResult.payload?.username,
      role: authResult.payload?.roleName
    });

    // Usar el servicio para obtener los tipos de paquetes activos
    const service = new ListPackageTypesActiveService();
    const result = await service.getActivePackageTypes();

    logInfo(FUNCTION_NAME, 'Tipos de paquetes activos obtenidos exitosamente', {
      total: result.total,
    });

    return createOkResponse(result, 'Tipos de paquetes activos obtenidos exitosamente', event);

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