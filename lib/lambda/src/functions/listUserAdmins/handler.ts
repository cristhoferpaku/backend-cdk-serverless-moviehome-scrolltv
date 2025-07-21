import { APIGatewayProxyEvent, APIGatewayProxyResult, Context } from 'aws-lambda';
import { ListUserAdminsService } from './services/listUserAdmins.service';
import { ListUserAdminsQueryParams } from './dtos/listUserAdmins.dto';
import { 
  createOkResponse,
  createInternalServerErrorResponse,
  createUnauthorizedResponse,
  validateAuthorizationHeader
} from '../../../layers/utils/nodejs/utils';

const FUNCTION_NAME = 'ListUserAdminsHandler';

/**
 * Handler principal de la función Lambda listUserAdmins
 */
export const handler = async (
  event: APIGatewayProxyEvent,
  context: Context
): Promise<APIGatewayProxyResult> => {

  try {
    // Validar que sea GET
    if (event.httpMethod !== 'GET') {
      return createInternalServerErrorResponse('Método HTTP no permitido', event);
    }

    // Validar JWT desde el header Authorization
    const authResult = validateAuthorizationHeader(
      event.headers?.['Authorization'] || event.headers?.['authorization'],
      ['administrador'] // Solo administradores pueden ver lista de usuarios
    );

    // Extraer query parameters
    const queryParams: ListUserAdminsQueryParams = {
      search: event.queryStringParameters?.search || undefined,
      roleId: event.queryStringParameters?.roleId || undefined,
      page: event.queryStringParameters?.page || undefined,
      limit: event.queryStringParameters?.limit || undefined,
    };

    // Usar el servicio para obtener los usuarios administradores
    const service = new ListUserAdminsService();
    const result = await service.getUserAdmins(queryParams);

    return createOkResponse(result, 'Usuarios administradores obtenidos exitosamente', event);

  } catch (error) {

    return createInternalServerErrorResponse(
      error instanceof Error ? error.message : 'Error interno del servidor',
      event
    );
  }
}; 