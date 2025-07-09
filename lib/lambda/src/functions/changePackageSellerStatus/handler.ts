import { APIGatewayProxyEvent, APIGatewayProxyResult, Context } from 'aws-lambda';
import { ChangePackageSellerStatusService } from './services/changePackageSellerStatus.service';
import { ChangePackageSellerStatusRequest } from './dtos/changePackageSellerStatus.dto';
import { 
  createOkResponse, 
  createBadRequestResponse,
  createUnauthorizedResponse,
  createForbiddenResponse,
  createNotFoundResponse,
  createInternalServerErrorResponse,
  parseRequestBody,
  validateRequiredFields,
  validateAuthorizationHeader,
  logError,
  logInfo 
} from '../../../layers/utils/nodejs/utils';

const FUNCTION_NAME = 'ChangePackageSellerStatusHandler';

/**
 * Handler principal de la función Lambda changePackageSellerStatus
 */
export const handler = async (
  event: APIGatewayProxyEvent,
  context: Context
): Promise<APIGatewayProxyResult> => {
  logInfo(FUNCTION_NAME, 'Iniciando procesamiento de cambio de status de paquete vendedor', {
    requestId: context.awsRequestId,
    httpMethod: event.httpMethod,
    path: event.path,
  });

  try {
    // Validar que sea PATCH
    if (event.httpMethod !== 'PATCH') {
      return createBadRequestResponse('Método HTTP no permitido. Use PATCH', event);
    }

    // Validar JWT y roles administrativos
    const authResult = validateAuthorizationHeader(
      event.headers['Authorization'] || event.headers['authorization'],
      ['administrador', 'gestor de contenido multimedia', 'vendedor', 'revendedor']
    );

    if (!authResult.isValid || !authResult.payload) {
      if (authResult.error?.includes('Token')) {
        return createUnauthorizedResponse(authResult.error, event);
      } else {
        return createForbiddenResponse(authResult.error, event);
      }
    }

    // Extraer ID del path parameter
    const packageSellerId = event.pathParameters?.id;
    if (!packageSellerId) {
      return createBadRequestResponse('ID del paquete vendedor requerido en la URL', event);
    }

    // Validar que el ID sea un número válido
    const numericId = parseInt(packageSellerId, 10);
    if (isNaN(numericId) || numericId <= 0) {
      return createBadRequestResponse('ID del paquete vendedor debe ser un número válido mayor a 0', event);
    }

    // Parsear el body
    const statusData = parseRequestBody<ChangePackageSellerStatusRequest>(event.body);
    if (!statusData) {
      return createBadRequestResponse('Cuerpo de la petición requerido', event);
    }

    // Validar campos requeridos
    const requiredFields = ['status'];
    const validationErrors = validateRequiredFields(statusData, requiredFields);

    if (validationErrors.length > 0) {
      return createBadRequestResponse('Status es requerido', event);
    }

    // Validar que status sea un número
    if (typeof statusData.status !== 'number' || isNaN(statusData.status)) {
      return createBadRequestResponse('Status debe ser un número válido', event);
    }

    // Validar que status esté en el rango correcto
    if (![0, 1, 2].includes(statusData.status)) {
      return createBadRequestResponse('Status debe ser 0 (inactivo), 1 (activo) o 2 (expirado)', event);
    }

    // Usar el servicio para cambiar el status
    const changePackageSellerStatusService = new ChangePackageSellerStatusService();
    const changeResult = await changePackageSellerStatusService.changePackageSellerStatus(numericId, statusData);

    if (!changeResult) {
      logInfo(FUNCTION_NAME, 'Paquete vendedor no encontrado o error en el cambio de status', { 
        packageSellerId: numericId,
        requestedStatus: statusData.status,
        userId: authResult.payload.userId
      });
      return createNotFoundResponse('Paquete vendedor no encontrado', event);
    }

    logInfo(FUNCTION_NAME, 'Status del paquete vendedor cambiado exitosamente', {
      packageSellerId: changeResult.id,
      packageName: changeResult.name,
      newStatus: changeResult.status,
      userId: authResult.payload.userId,
      username: authResult.payload.username
    });

    return createOkResponse(changeResult, 'Status del paquete vendedor cambiado exitosamente', event);

  } catch (error) {
    logError(FUNCTION_NAME, error instanceof Error ? error : 'Error desconocido', {
      requestId: context.awsRequestId,
      event: {
        httpMethod: event.httpMethod,
        path: event.path,
        pathParameters: event.pathParameters,
      },
    });

    return createInternalServerErrorResponse(
      error instanceof Error ? error.message : 'Error interno del servidor',
      event
    );
  }
}; 