import { APIGatewayProxyEvent, APIGatewayProxyResult, Context } from 'aws-lambda';
import { ClientLoginService } from './services/clientLogin.service';
import { LoginRequest } from './dtos/clientLogin.dto';
import { 
  createOkResponse, 
  createBadRequestResponse,
  createUnauthorizedResponse,
  createInternalServerErrorResponse,
  parseRequestBody,
  validateRequiredFields
} from '../../../layers/utils/nodejs/utils';

const FUNCTION_NAME = 'ClientLoginHandler';

/**
 * Handler principal de la función Lambda clientLogin
 * Específico para autenticación de clientes móviles
 */
export const handler = async (
  event: APIGatewayProxyEvent,
  context: Context
): Promise<APIGatewayProxyResult> => {

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
    const requiredFields = ['username', 'password', 'id_device', 'platform'];
    const validationErrors = validateRequiredFields(loginData, requiredFields);

    if (validationErrors.length > 0) {
      return createBadRequestResponse('Username, password, id_device y platform son requeridos', event);
    }

    // Usar el servicio para autenticar cliente
    const clientLoginService = new ClientLoginService();
    const loginResult = await clientLoginService.login(loginData);

    if (!loginResult) {
      return createUnauthorizedResponse('Credenciales inválidas', event);
    }


    return createOkResponse(loginResult, 'Login de cliente exitoso', event);

  } catch (error) {

    return createInternalServerErrorResponse(
      error instanceof Error ? error.message : 'Error interno del servidor',
      event
    );
  }
};