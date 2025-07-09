import { APIGatewayProxyEvent, APIGatewayProxyResult, Context } from 'aws-lambda';
import { GetPackageUserByIdService } from './services/getPackageUserById.service';
import {
  createOkResponse,
  createBadRequestResponse,
  createUnauthorizedResponse,
  createForbiddenResponse,
  createNotFoundResponse,
  createInternalServerErrorResponse,
  validateAuthorizationHeader,
  logError,
  logInfo
} from '../../../layers/utils/nodejs/utils';

const FUNCTION_NAME = 'GetPackageUserByIdHandler';
const REQUIRED_ROLES = ['administrador','vendedor','revendedor'];

/**
 * Handler principal de la función Lambda getPackageUserById
 */
export const handler = async (
  event: APIGatewayProxyEvent,
  context: Context
): Promise<APIGatewayProxyResult> => {
  logInfo(FUNCTION_NAME, 'Iniciando procesamiento de obtener paquete de usuario por ID', {
    requestId: context.awsRequestId,
    httpMethod: event.httpMethod,
    path: event.path,
    pathParameters: event.pathParameters,
  });

  try {
    // Validar que sea GET
    if (event.httpMethod !== 'GET') {
      return createBadRequestResponse('Método HTTP no permitido', event);
    }

    // Validar autorización JWT
    const authValidation = validateAuthorizationHeader(
      event.headers?.Authorization || event.headers?.authorization,
      REQUIRED_ROLES
    );

    if (!authValidation.isValid) {
      if (authValidation.error === 'Token de autorización requerido' || 
          authValidation.error === 'Token inválido' || 
          authValidation.error === 'Token JWT inválido o expirado') {
        return createUnauthorizedResponse(authValidation.error, event);
      } else {
        return createForbiddenResponse(authValidation.error, event);
      }
    }

    // Extraer ID desde pathParameters
    const packageUserId = event.pathParameters?.id;
    if (!packageUserId) {
      return createBadRequestResponse('ID del paquete requerido', event);
    }

    // Validar que el ID sea un número
    const id = parseInt(packageUserId, 10);
    if (isNaN(id) || id <= 0) {
      return createBadRequestResponse('ID del paquete debe ser un número entero positivo', event);
    }

    // Usar el servicio para obtener el paquete de usuario
    const getPackageUserByIdService = new GetPackageUserByIdService();
    const result = await getPackageUserByIdService.getPackageUserById(id);

    if (!result.success) {
      if (result.message?.includes('no encontrado') || result.message?.includes('ID del paquete inválido')) {
        return createNotFoundResponse(result.message, event);
      }

      if (result.message?.includes('inválido') || result.message?.includes('debe ser')) {
        return createBadRequestResponse(result.message, event);
      }

      return createInternalServerErrorResponse(result.message || 'Error interno del servidor', event);
    }

    logInfo(FUNCTION_NAME, 'Paquete de usuario obtenido exitosamente', {
      id: result.data?.id,
      name: result.data?.name,
      userId: authValidation.payload?.userId,
      userRole: authValidation.payload?.roleName
    });

    return createOkResponse(result.data, 'Paquete de usuario obtenido exitosamente', event);

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