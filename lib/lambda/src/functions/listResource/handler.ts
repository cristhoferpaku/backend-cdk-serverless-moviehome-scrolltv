import { APIGatewayProxyEvent, APIGatewayProxyResult, Context } from 'aws-lambda';
import { ListResourceService } from './services/listResource.service';
import { ListResourceQueryParams, ListResourceRequest } from './dtos/listResource.dto';
import {
  createOkResponse,
  createInternalServerErrorResponse,
  createUnauthorizedResponse,

  validateAuthorizationHeader
} from '../../../layers/utils/nodejs/utils';

const FUNCTION_NAME = 'ListResourceHandler';
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
    const queryParams: ListResourceQueryParams = {
      search: event.queryStringParameters?.search,
      status: event.queryStringParameters?.status,
      page: event.queryStringParameters?.page,
      limit: event.queryStringParameters?.limit,
    };
    // Inicializar servicio
    const service = new ListResourceService();
    const result = await service.listResource(queryParams);
    return createOkResponse(result, 'Recursos obtenidos correctamente', event);
  } catch (error) {
    return createInternalServerErrorResponse(
      error instanceof Error ? error.message : 'Error interno del servidor',
      event
    );
  }
};