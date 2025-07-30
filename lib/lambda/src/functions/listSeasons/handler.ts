import { APIGatewayProxyEvent, APIGatewayProxyResult, Context } from 'aws-lambda';
import { ListSeasonService } from './services/listSeasons.service';
import { ListSeasonQueryParams } from './dtos/listSeasons.dto';
import {
  createOkResponse,
  createInternalServerErrorResponse,
  createUnauthorizedResponse,
  validateAuthorizationHeader
} from '../../../layers/utils/nodejs/utils';

const FUNCTION_NAME = 'ListSeasonHandler';
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

    const queryParams: ListSeasonQueryParams = {
      serie_id: event.queryStringParameters?.serie_id ? Number(event.queryStringParameters.serie_id) : undefined,
    };

    const service = new ListSeasonService();
    const result = await service.getSeason(queryParams);

    return createOkResponse(result.items, 'temporadas obtenidas correctamente', event);
  } catch (error) {


    return createInternalServerErrorResponse(
      error instanceof Error ? error.message : 'Error interno del servidor',
      event
    );
  }
};
