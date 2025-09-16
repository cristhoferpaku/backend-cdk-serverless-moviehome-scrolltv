import { APIGatewayProxyEvent, APIGatewayProxyResult, Context } from 'aws-lambda';
import { GetEpisodesFromSeasonService } from './services/getEpisodesFromSeason.service';
import {
  GetEpisodesFromSeasonRequest,
  GetEpisodesFromSeasonResponse
} from './dtos/getEpisodesFromSeason.dto';
import {
  createOkResponse,
  createBadRequestResponse,
  createUnauthorizedResponse,
  createForbiddenResponse,
  createInternalServerErrorResponse,
  validateAuthorizationHeader,
} from '../../../layers/utils/nodejs/utils';

const FUNCTION_NAME = 'GetEpisodesFromSeasonHandler';
const REQUIRED_ROLES = ['administrador', 'gestor de contenido multimedia', 'cliente'];

export const handler = async (
  event: APIGatewayProxyEvent,
  context: Context
): Promise<APIGatewayProxyResult> => {

  try {
    // Validar método HTTP
    if (event.httpMethod !== 'GET') {
      return createBadRequestResponse('Método HTTP no permitido', event);
    }

    // Validar JWT y roles requeridos
    const authValidation = validateAuthorizationHeader(
      event.headers?.Authorization || event.headers?.authorization,
      REQUIRED_ROLES
    );

    if (!authValidation.isValid) {
      return authValidation.error?.includes('Token')
        ? createUnauthorizedResponse(authValidation.error, event)
        : createForbiddenResponse(authValidation.error, event);
    }

    // Validar y obtener el id desde pathParameters
    const idParam = event.pathParameters?.id;
    const season_id = idParam ? parseInt(idParam) : NaN;

    if (!idParam || isNaN(season_id) || season_id <= 0) {
      return createBadRequestResponse('El parámetro {id} es requerido y debe ser un número válido', event);
    }

    // Servicio
    const service = new GetEpisodesFromSeasonService();
    const result: GetEpisodesFromSeasonResponse = await service.getEpisodesFromSeason({ season_id });

    if (!result.success) {
      return createBadRequestResponse(result.message, event);
    }
    return createOkResponse(result.data, result.message, event);

  } catch (error) {
    return createInternalServerErrorResponse(
      error instanceof Error ? error.message : 'Error interno del servidor',
      event
    );
  }
};
