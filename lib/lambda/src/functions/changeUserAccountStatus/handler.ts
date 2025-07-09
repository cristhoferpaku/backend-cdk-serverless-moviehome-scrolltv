import { APIGatewayProxyEvent, APIGatewayProxyResult, Context } from 'aws-lambda';
import { ChangeUserAccountStatusService } from './services/changeUserAccountStatus.service';
import {
  createOkResponse,
  createBadRequestResponse,
  createInternalServerErrorResponse,
  createUnauthorizedResponse,
  createForbiddenResponse,
  parseRequestBody,
  validateAuthorizationHeader,
  validateRequiredFields,
  logInfo,
  logError
} from '../../../layers/utils/nodejs/utils';

const FUNCTION_NAME = 'ChangeUserAccountStatusHandler';
const REQUIRED_ROLES = ['administrador','vendedor','revendedor'];

export const handler = async (
  event: APIGatewayProxyEvent,
  context: Context
): Promise<APIGatewayProxyResult> => {
  logInfo(FUNCTION_NAME, 'Inicio de procesamiento', {
    requestId: context.awsRequestId,
    httpMethod: event.httpMethod,
    path: event.path,
    pathParameters: event.pathParameters
  });

  try {
    if (event.httpMethod !== 'PATCH') {
      return createBadRequestResponse('Método HTTP no permitido', event);
    }

    const authValidation = validateAuthorizationHeader(
      event.headers?.Authorization || event.headers?.authorization,
      REQUIRED_ROLES
    );

    if (!authValidation.isValid) {
      return authValidation.error?.includes('Token')
        ? createUnauthorizedResponse(authValidation.error, event)
        : createForbiddenResponse(authValidation.error, event);
    }

    // Obtener ID desde pathParameters
    const idParam = event.pathParameters?.id;
    const id = idParam ? parseInt(idParam) : NaN;
    if (!idParam || isNaN(id) || id <= 0) {
      return createBadRequestResponse('El parámetro {id} es requerido y debe ser un número válido', event);
    }

    const body = parseRequestBody<{ status: number }>(event.body);
    if (!body) {
      return createBadRequestResponse('Cuerpo de la petición requerido', event);
    }

    const requiredFields = ['status'];
    const validationErrors = validateRequiredFields(body, requiredFields);
    if (validationErrors.length > 0) {
      return createBadRequestResponse(
        `Faltan campos requeridos: ${validationErrors.join(', ')}`,
        event
      );
    }

    const service = new ChangeUserAccountStatusService();
    const result = await service.changeStatus({ id, status: body.status });

    if (!result.success) {
      return createBadRequestResponse(result.message, event);
    }

    logInfo(FUNCTION_NAME, 'Estado del usuario actualizado correctamente', {
      id: result.data?.id,
      newStatus: result.data?.status,
      performedBy: authValidation.payload?.userId
    });

    return createOkResponse(result.data, result.message, event);

  } catch (error) {

    return createInternalServerErrorResponse(
      error instanceof Error ? error.message : 'Error interno del servidor',
      event
    );
  }
};
