import { APIGatewayProxyEvent, APIGatewayProxyResult, Context } from 'aws-lambda';
import { ListRevendedoresService } from './services/listRevendedores.service';
import { ListRevendedoresQueryParams, ListRevendedoresRequest } from './dtos/listRevendedores.dto';
import {
  createOkResponse,
  createInternalServerErrorResponse,
  createUnauthorizedResponse,

  validateAuthorizationHeader
} from '../../../layers/utils/nodejs/utils';

const FUNCTION_NAME = 'ListRevendedoresHandler';
const REQUIRED_ROLES = ['administrador', 'gestor de contenido multimedia','vendedor','revendedor'];

export const handler = async (
  event: APIGatewayProxyEvent,
  context: Context
): Promise<APIGatewayProxyResult> => {
  
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
    const queryParams: ListRevendedoresQueryParams = {
      search: event.queryStringParameters?.search,
      status: event.queryStringParameters?.status,
      page: event.queryStringParameters?.page,
      limit: event.queryStringParameters?.limit,
    };
    const idUser = auth.payload?.userId || 0;
    // Inicializar servicio
    const service = new ListRevendedoresService();
    const result = await service.listRevendedores(queryParams, idUser);
    return createOkResponse(result, 'Revendedores obtenidos correctamente', event);
  } catch (error) {
    return createInternalServerErrorResponse(
      error instanceof Error ? error.message : 'Error interno del servidor',
      event
    );
  }
};