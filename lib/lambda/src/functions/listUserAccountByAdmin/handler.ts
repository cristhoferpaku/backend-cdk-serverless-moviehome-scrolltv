import { APIGatewayProxyEvent, APIGatewayProxyResult, Context } from 'aws-lambda';
import { ListUserAccountsService } from './services/listUserAccountByAdmin.service';
import { ListUserAccountsQueryParams } from './dtos/listUserAccountByAdmin.dto';
import {
  createOkResponse,
  createInternalServerErrorResponse,
  createUnauthorizedResponse,
  logError,
  logInfo,
  validateAuthorizationHeader
} from '../../../layers/utils/nodejs/utils';

const FUNCTION_NAME = 'ListUserAccountsHandler';
const REQUIRED_ROLES = ['administrador', 'gestor de contenido multimedia'];

export const handler = async (
  event: APIGatewayProxyEvent,
  context: Context
): Promise<APIGatewayProxyResult> => {
  logInfo(FUNCTION_NAME, 'Inicio de listado de cuentas de usuario', {
    requestId: context.awsRequestId,
    queryParams: event.queryStringParameters
  });

  try {
    if (event.httpMethod !== 'GET') {
      return createInternalServerErrorResponse('Método HTTP no permitido', event);
    }

    const auth = validateAuthorizationHeader(
      event.headers?.Authorization || event.headers?.authorization,
      REQUIRED_ROLES
    );

    if (!auth.isValid) {
      return createUnauthorizedResponse(auth.error || 'Token inválido', event);
    }

    const queryParams: ListUserAccountsQueryParams = {
      user_admin_id: auth.payload?.userId || 0,
      search: event.queryStringParameters?.search,
      status: event.queryStringParameters?.status,
      page: event.queryStringParameters?.page,
      limit: event.queryStringParameters?.limit,
    };

    const service = new ListUserAccountsService();
    const result = await service.getUserAccounts(queryParams);

    return createOkResponse(result, 'Cuentas de usuario obtenidas correctamente', event);
  } catch (error) {

    return createInternalServerErrorResponse(
      error instanceof Error ? error.message : 'Error interno del servidor',
      event
    );
  }
};
