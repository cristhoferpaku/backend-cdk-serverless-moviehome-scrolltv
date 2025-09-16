import { APIGatewayProxyEvent, APIGatewayProxyResult, Context } from 'aws-lambda';
import { ValidateServiceExpirationService } from './services/validateServiceExpiration.service';
import { ValidateServiceExpirationRequest } from './dtos/validateServiceExpiration.dto';
import {
  createBadRequestResponse,
  createOkResponse,
  createUnauthorizedResponse,
  createForbiddenResponse,
  createInternalServerErrorResponse,
  validateAuthorizationHeader,
  validateRequiredFields
} from '../../../layers/utils/nodejs/utils';

const REQUIRED_ROLES = [ 'cliente'];

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

    const userId = authValidation.payload?.userId;

    if (!userId) {
      return createBadRequestResponse('El userId es requerido', event);
    }
    const body = JSON.parse(event.body || '{}');
 if (!body) {
      return createBadRequestResponse('El cuerpo de la petición es requerido', event);
    }
   const requiredFields = [
      'device_id',

    ];
      const validationErrors = validateRequiredFields(body, requiredFields);
 if (validationErrors.length > 0) {
      return createBadRequestResponse(`Faltan campos requeridos: ${validationErrors.join(', ')}`, event);
    }
    const device_id = body.device_id;

    if (!device_id) {
      return createBadRequestResponse('El device_id es requerido', event);
    }
    
    const service = new ValidateServiceExpirationService();
    const result = await service.validateServiceExpiration({ user_id: userId, p_device_id: device_id });

    // if (!result.success) {
    //   return createBadRequestResponse(result.message, event);
    // }

    return createOkResponse(result.data, result.message, event);

  } catch (error) {
    return createInternalServerErrorResponse(
      error instanceof Error ? error.message : 'Error interno del servidor',
      event
    );
  }
};
