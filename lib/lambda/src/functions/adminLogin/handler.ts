import { APIGatewayProxyEvent, APIGatewayProxyResult, Context } from 'aws-lambda';
import { AdminLoginService } from './services/adminLogin.service';
import { LoginRequest } from './dtos/adminLogin.dto';
import { 
  createOkResponse, 
  createBadRequestResponse,
  createUnauthorizedResponse,
  createInternalServerErrorResponse,
  parseRequestBody,
  validateRequiredFields,
  logError,
  logInfo 
} from '../../../layers/utils/nodejs/utils';

const FUNCTION_NAME = 'AdminLoginHandler';

/**
 * Handler principal de la función Lambda adminLogin
 */
export const handler = async (
  event: APIGatewayProxyEvent,
  context: Context
): Promise<APIGatewayProxyResult> => {
  logInfo(FUNCTION_NAME, 'Iniciando procesamiento de login', {
    requestId: context.awsRequestId,
    httpMethod: event.httpMethod,
    path: event.path,
  });

  try {
    // Validar que sea POST
    if (event.httpMethod !== 'POST') {
      return createBadRequestResponse('Método HTTP no permitido', event);
    }

    // Parsear el body
    const loginData = parseRequestBody<LoginRequest>(event.body);
    if (!loginData) {
      return createBadRequestResponse('Cuerpo de la petición requerido', event);
    }

    // Validar campos requeridos
    const requiredFields = ['username', 'password'];
    const validationErrors = validateRequiredFields(loginData, requiredFields);

    if (validationErrors.length > 0) {
      return createBadRequestResponse('Username y password son requeridos', event);
    }

    // Usar el servicio para autenticar
    const adminLoginService = new AdminLoginService();
    const loginResult = await adminLoginService.login(loginData);

    if (!loginResult) {
      return createUnauthorizedResponse('Credenciales inválidas', event);
    }



    return createOkResponse(loginResult, 'Login exitoso', event);

  } catch (error) {
    logError(FUNCTION_NAME, error instanceof Error ? error : 'Error desconocido', {
      requestId: context.awsRequestId,
      event: {
        httpMethod: event.httpMethod,
        path: event.path,
      },
    });

    return createInternalServerErrorResponse(
      error instanceof Error ? error.message : 'Error interno del servidor',
      event
    );
  }
}; 