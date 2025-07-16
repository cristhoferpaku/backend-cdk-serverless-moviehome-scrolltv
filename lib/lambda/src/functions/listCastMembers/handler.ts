import { APIGatewayProxyEvent, APIGatewayProxyResult, Context } from 'aws-lambda';
import { ListCastMemberService } from './services/listCastMembers.service';
import { ListCastMemberQueryParams, ListCastMemberRequest } from './dtos/listCastMembers.dto';
import {
  createOkResponse,
  createInternalServerErrorResponse,
  createUnauthorizedResponse,

  validateAuthorizationHeader
} from '../../../layers/utils/nodejs/utils';

const FUNCTION_NAME = 'ListCastMemberHandler';
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
    const queryParams: ListCastMemberQueryParams = {
      search: event.queryStringParameters?.search,
      page: event.queryStringParameters?.page,
      limit: event.queryStringParameters?.limit,
    };
    // Inicializar servicio
    const service = new ListCastMemberService();
    const result = await service.listCastMember(queryParams);
    return createOkResponse(result, 'CastMembers obtenidos correctamente', event);
  } catch (error) {
    return createInternalServerErrorResponse(
      error instanceof Error ? error.message : 'Error interno del servidor',
      event
    );
  }
};