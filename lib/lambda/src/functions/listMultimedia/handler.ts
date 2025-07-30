import { APIGatewayProxyEvent, APIGatewayProxyResult, Context } from 'aws-lambda';
import { ListMultimediaService } from './services/listMultimedia.service';
import { ListMultimediaQueryParams } from './dtos/listMultimedia.dto';
import {
  createOkResponse,
  createInternalServerErrorResponse,
  createUnauthorizedResponse,
  validateAuthorizationHeader
} from '../../../layers/utils/nodejs/utils';

const FUNCTION_NAME = 'ListMultimediaHandler';
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

    const queryParams: ListMultimediaQueryParams = {
      search: event.queryStringParameters?.search,
      status: event.queryStringParameters?.status,
      page: event.queryStringParameters?.page,
      limit: event.queryStringParameters?.limit,
    };

    const service = new ListMultimediaService();
    const result = await service.getMultimedia(queryParams);

    return createOkResponse(result, 'multimedia obtenida correctamente', event);
  } catch (error) {


    return createInternalServerErrorResponse(
      error instanceof Error ? error.message : 'Error interno del servidor',
      event
    );
  }
};
