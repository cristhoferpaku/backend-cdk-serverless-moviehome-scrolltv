import { APIGatewayProxyEvent, APIGatewayProxyResult, Context } from 'aws-lambda';
import { CreateSeasonService } from './services/createSeason.service';
import { CreateSeasonRequest } from './dtos/createSeason.dto';
import {
  createBadRequestResponse,
  createCreatedResponse,
  createUnauthorizedResponse,
  createForbiddenResponse,
  createInternalServerErrorResponse,
  parseRequestBody,
  validateRequiredFields,
  validateAuthorizationHeader,

} from '../../../layers/utils/nodejs/utils';

const FUNCTION_NAME = 'CreateSeasonHandler';
const REQUIRED_ROLES = ['administrador','gestor de contenido multimedia'];

export const handler = async (
  event: APIGatewayProxyEvent,
  context: Context
): Promise<APIGatewayProxyResult> => {

  try {
    if (event.httpMethod !== 'POST') {
      return createBadRequestResponse('Método HTTP no permitido', event);
    }

    const authValidation = validateAuthorizationHeader(
      event.headers?.Authorization || event.headers?.authorization,
      REQUIRED_ROLES
    );

    if (!authValidation.isValid) {
      return authValidation.error?.includes('Token') ?
        createUnauthorizedResponse(authValidation.error, event) :
        createForbiddenResponse(authValidation.error, event);
    }

    const body = parseRequestBody<CreateSeasonRequest>(event.body);
    if (!body) {
      return createBadRequestResponse('Cuerpo de la petición requerido', event);
    }
    const requiredFields = [
      'series_id',
    ];
    const validationErrors = validateRequiredFields(body, requiredFields);

    if (validationErrors.length > 0) {
      return createBadRequestResponse(`Faltan campos requeridos: ${validationErrors.join(', ')}`, event);
    }

    const service = new CreateSeasonService();
    const result = await service.createSeason(body);

    if (!result.success) {
      return createBadRequestResponse(result.message, event);
    }


    return createCreatedResponse(result.data, result.message, event);

  } catch (error) {
    return createInternalServerErrorResponse(
      error instanceof Error ? error.message : 'Error interno del servidor',
      event
    );
  }
};
