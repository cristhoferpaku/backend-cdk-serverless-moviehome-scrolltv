import { APIGatewayProxyEvent, APIGatewayProxyResult, Context } from 'aws-lambda';
import { LogoutMobileService } from './services/logoutMobile.service';
import { LogoutMobileRequest } from './dtos/logoutMobile.dto';
import {
  createBadRequestResponse,
  createOkResponse,
  createUnauthorizedResponse,
  createInternalServerErrorResponse,
  parseRequestBody,
  validateRequiredFields,
  validateAuthorizationHeader
} from '../../../layers/utils/nodejs/utils';

const FUNCTION_NAME = 'LogoutMobileHandler';
const REQUIRED_ROLES = ['cliente'];

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
      return createUnauthorizedResponse(authValidation.error || 'No autorizado', event);
    }

    const body = parseRequestBody<LogoutMobileRequest>(event.body);
    if (!body) {
      return createBadRequestResponse('Cuerpo de la petición requerido', event);
    }

    const requiredFields = ['id_device'];
    const validationErrors = validateRequiredFields(body, requiredFields);

    if (validationErrors.length > 0) {
      return createBadRequestResponse('El campo id_device es requerido', event);
    }

    const service = new LogoutMobileService();
    const result = await service.logoutUser(body);

    if (!result.success) {
      return createBadRequestResponse(result.message, event);
    }

    return createOkResponse(null, result.message, event);

  } catch (error) {
    return createInternalServerErrorResponse(
      error instanceof Error ? error.message : 'Error interno del servidor',
      event
    );
  }
};
