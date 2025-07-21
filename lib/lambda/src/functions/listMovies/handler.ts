import { APIGatewayProxyEvent, APIGatewayProxyResult, Context } from 'aws-lambda';
import { ListMovieService } from './services/listMovies.service';
import { ListMovieQueryParams } from './dtos/listMovies.dto';
import {
  createOkResponse,
  createInternalServerErrorResponse,
  createUnauthorizedResponse,
  validateAuthorizationHeader
} from '../../../layers/utils/nodejs/utils';

const FUNCTION_NAME = 'ListMovieHandler';
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

    const queryParams: ListMovieQueryParams = {
      search: event.queryStringParameters?.search,
      status: event.queryStringParameters?.status,
      page: event.queryStringParameters?.page,
      limit: event.queryStringParameters?.limit,
    };

    const service = new ListMovieService();
    const result = await service.getMovie(queryParams);

    return createOkResponse(result, 'Películas obtenidas correctamente', event);
  } catch (error) {


    return createInternalServerErrorResponse(
      error instanceof Error ? error.message : 'Error interno del servidor',
      event
    );
  }
};
