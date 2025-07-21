import { APIGatewayProxyEvent, APIGatewayProxyResult, Context } from 'aws-lambda';
import { ListCollectionsService } from './services/listCollections.service';
import { ListCollectionsQueryParams } from './dtos/listCollections.dto';
import {
  createOkResponse,
  createInternalServerErrorResponse,
  createUnauthorizedResponse,
  validateAuthorizationHeader
} from '../../../layers/utils/nodejs/utils';

const FUNCTION_NAME = 'ListCollectionsHandler';
const REQUIRED_ROLES = ['administrador', 'gestor de contenido multimedia'];

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

    const queryParams: ListCollectionsQueryParams = {
      search: event.queryStringParameters?.search,
      status: event.queryStringParameters?.status,
      page: event.queryStringParameters?.page,
      limit: event.queryStringParameters?.limit,
    };

    const service = new ListCollectionsService();
    const result = await service.getCollections(queryParams);

    return createOkResponse(result, 'Colecciones obtenidas correctamente', event);
  } catch (error) {


    return createInternalServerErrorResponse(
      error instanceof Error ? error.message : 'Error interno del servidor',
      event
    );
  }
};
