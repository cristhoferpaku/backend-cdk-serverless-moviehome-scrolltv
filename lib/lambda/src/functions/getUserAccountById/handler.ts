import { APIGatewayProxyEvent, APIGatewayProxyResult, Context } from 'aws-lambda';
import { GetUserAccountByIdService } from './services/getUserAccountById.service';
import {
  GetUserAccountByIdRequest,
  GetUserAccountByIdResponse
} from './dtos/getUserAccountById.dto';
import {
  createOkResponse,
  createBadRequestResponse,
  createUnauthorizedResponse,
  createForbiddenResponse,
  createInternalServerErrorResponse,
  validateAuthorizationHeader,
  logInfo,
  logError
} from '../../../layers/utils/nodejs/utils';

const FUNCTION_NAME = 'GetUserAccountByIdHandler';
const REQUIRED_ROLES = ['administrador', 'gestor de contenido multimedia'];

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

    // Validar y obtener el ID desde pathParameters
    const idParam = event.pathParameters?.id;
    const id = idParam ? parseInt(idParam) : NaN;

    if (!idParam || isNaN(id) || id <= 0) {
      return createBadRequestResponse('El parámetro {id} es requerido y debe ser un número válido', event);
    }

    // Servicio
    const service = new GetUserAccountByIdService();
    const result: GetUserAccountByIdResponse = await service.getUserAccountById({ id });

    if (!result.success) {
      return createBadRequestResponse(result.message, event);
    }

    logInfo(FUNCTION_NAME, 'Consulta exitosa de cuenta de usuario', {
      id: result.data?.id,
      username: result.data?.username,
      userId: authValidation.payload?.userId,
      userRole: authValidation.payload?.roleName
    });

    return createOkResponse(result.data, result.message, event);

  } catch (error) {
   

    return createInternalServerErrorResponse(
      error instanceof Error ? error.message : 'Error interno del servidor',
      event
    );
  }
};
