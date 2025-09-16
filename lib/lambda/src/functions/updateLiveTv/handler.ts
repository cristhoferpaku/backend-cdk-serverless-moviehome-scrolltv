import { APIGatewayProxyEvent, APIGatewayProxyResult, Context } from 'aws-lambda';
import { UpdateLiveTvService } from './services/updateLiveTv.service';
import {
  createBadRequestResponse,
  createOkResponse,
  createInternalServerErrorResponse,
  createUnauthorizedResponse,
  createForbiddenResponse,
  parseRequestBody,
  validateAuthorizationHeader,
} from '../../../layers/utils/nodejs/utils';
import { UpdateLiveTvRequest } from './dtos/updateLiveTv.dto';

const FUNCTION_NAME = 'UpdateLiveTvHandler';
const REQUIRED_ROLES = ['administrador','gestor de contenido multimedia'];

export const handler = async (
  event: APIGatewayProxyEvent,
): Promise<APIGatewayProxyResult> => {


  try {
    if (event.httpMethod !== 'PUT') {
      return createBadRequestResponse('Método HTTP no permitido', event);
    }

    const auth = validateAuthorizationHeader(
      event.headers?.Authorization || event.headers?.authorization,
      REQUIRED_ROLES
    );

    if (!auth.isValid) {
      return auth.error?.includes('Token')
        ? createUnauthorizedResponse(auth.error, event)
        : createForbiddenResponse(auth.error, event);
    }

    const idParam = event.pathParameters?.id;
    const id = idParam ? parseInt(idParam) : NaN;
    if (!idParam || isNaN(id) || id <= 0) {
      return createBadRequestResponse('ID inválido en el path', event);
    }

    const body = parseRequestBody<UpdateLiveTvRequest>(event.body);
    if (!body || Object.keys(body).length === 0) {
      return createBadRequestResponse('Datos de actualización del LiveTV requeridos', event);
    }

    const service = new UpdateLiveTvService();
    const result = await service.updateLiveTv(id, body);

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
