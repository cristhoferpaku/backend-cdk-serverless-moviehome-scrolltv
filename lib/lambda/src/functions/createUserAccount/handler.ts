import { APIGatewayProxyEvent, APIGatewayProxyResult, Context } from 'aws-lambda';
import { CreateUserAccountService } from './services/createUserAccount.service';
import { CreateUserAccountRequest } from './dtos/createUserAccount.dto';
import {
  createBadRequestResponse,
  createCreatedResponse,
  createUnauthorizedResponse,
  createForbiddenResponse,
  createInternalServerErrorResponse,
  parseRequestBody,
  validateRequiredFields,
  validateAuthorizationHeader,
  logInfo,
  logError
} from '../../../layers/utils/nodejs/utils';

const FUNCTION_NAME = 'CreateUserAccountHandler';
const REQUIRED_ROLES = ['administrador','vendedor','revendedor'];

export const handler = async (
  event: APIGatewayProxyEvent,
  context: Context
): Promise<APIGatewayProxyResult> => {
  logInfo(FUNCTION_NAME, 'Iniciando creación de cuenta de usuario', {
    requestId: context.awsRequestId
  });

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

    const body = parseRequestBody<CreateUserAccountRequest>(event.body);
    if (!body) {
      return createBadRequestResponse('Cuerpo de la petición requerido', event);
    }

    const requiredFields = [
      'username',
      'password',
      'package_user_id',
      'platform_id',
      'user_admin_id'
    ];
    const validationErrors = validateRequiredFields(body, requiredFields);

    if (validationErrors.length > 0) {
      return createBadRequestResponse(`Faltan campos requeridos: ${validationErrors.join(', ')}`, event);
    }

    const service = new CreateUserAccountService();
    const result = await service.createUserAccount(body);

    if (!result.success) {
      return createBadRequestResponse(result.message, event);
    }

    logInfo(FUNCTION_NAME, 'Cuenta creada exitosamente', {
      username: result.data?.username
    });

    return createCreatedResponse(result.data, result.message, event);

  } catch (error) {
    logError(FUNCTION_NAME, error instanceof Error ? error : 'Error desconocido', { requestId: context.awsRequestId });
    return createInternalServerErrorResponse(
      error instanceof Error ? error.message : 'Error interno del servidor',
      event
    );
  }
};
