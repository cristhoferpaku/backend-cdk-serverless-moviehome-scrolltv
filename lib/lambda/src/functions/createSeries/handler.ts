import { APIGatewayProxyEvent, APIGatewayProxyResult, Context } from 'aws-lambda';
import { CreateSerieService } from './services/createSeries.service';
import { CreateSerieRequest } from './dtos/createSeries.dto';
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

const FUNCTION_NAME = 'CreateSerieHandler';
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

    const body = parseRequestBody<CreateSerieRequest>(event.body);
    if (!body) {
      return createBadRequestResponse('Cuerpo de la petición requerido', event);
    }
/*

 title: string;
    description: string;
    category_id: number;
    section_id: number;
    country_id: number;
    collection_id: number;
    duration_secs: number;
    cover_image: string | null;
    video_url: string | null;
    cast_ids: number[] | null;
    publish_platform_1: boolean ;
    publish_platform_2: boolean;*/
    const requiredFields = [
      'title',
      'description',
      'category_ids',
      'section_id',
      'country_id',
      'collection_id',
      'publish_platform_1',
      'publish_platform_2'
    ];
    const validationErrors = validateRequiredFields(body, requiredFields);

    if (validationErrors.length > 0) {
      return createBadRequestResponse(`Faltan campos requeridos: ${validationErrors.join(', ')}`, event);
    }

    const service = new CreateSerieService();
    const result = await service.createSerie(body);

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
