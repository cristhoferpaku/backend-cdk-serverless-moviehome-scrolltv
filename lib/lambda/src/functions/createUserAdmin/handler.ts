import { APIGatewayProxyEvent, APIGatewayProxyResult, Context } from 'aws-lambda';
import { CreateUserAdminService } from './services/createUserAdmin.service';
import { CreateUserAdminRequest } from './dtos/createUserAdmin.dto';
import { 
  createOkResponse, 
  createBadRequestResponse,
  createInternalServerErrorResponse,
  createConflictResponse,
  createUnauthorizedResponse,
  createForbiddenResponse,
  parseRequestBody,
  validateRequiredFields,
  validateAuthorizationHeader,
  logError,
  logInfo 
} from '../../../layers/utils/nodejs/utils';

const FUNCTION_NAME = 'CreateUserAdminHandler';

/**
 * Handler principal de la función Lambda createUserAdmin
 */
export const handler = async (
  event: APIGatewayProxyEvent,
  context: Context
): Promise<APIGatewayProxyResult> => {
  logInfo(FUNCTION_NAME, 'Iniciando procesamiento de creación de usuario admin', {
    requestId: context.awsRequestId,
    httpMethod: event.httpMethod,


    
    path: event.path,
  });

  try {
    // Validar que sea POST
    if (event.httpMethod !== 'POST') {
      return createBadRequestResponse('Método HTTP no permitido', event);
    }

    // Validar JWT Token y permisos de administrador
    const authHeader = event.headers.Authorization || event.headers.authorization;
    const authValidation = validateAuthorizationHeader(authHeader, ['administrador']);
    
    if (!authValidation.isValid) {
      if (authValidation.error?.includes('Token')) {
        return createUnauthorizedResponse(authValidation.error, event);
      } else {
        return createForbiddenResponse(authValidation.error || 'Acceso denegado', event);
      }

    }

    const userPayload = authValidation.payload!;
    logInfo(FUNCTION_NAME, 'Usuario autenticado', {
      userId: userPayload.userId,
      username: userPayload.username,
      role: userPayload.roleName
    });

    // Parsear el body
    const userData = parseRequestBody<CreateUserAdminRequest>(event.body);
    if (!userData) {
      return createBadRequestResponse('Cuerpo de la petición requerido', event);
    }

    // Validar campos requeridos
    const requiredFields = ['username', 'password', 'role_id'];
    const validationErrors = validateRequiredFields(userData, requiredFields);

    if (validationErrors.length > 0) {
      return createBadRequestResponse('el usuario, contraseña y rol son requeridos', event);
    }

    // Validaciones básicas (el stored procedure se encarga de las validaciones de negocio)
    if (typeof userData.role_id !== 'number' || userData.role_id <= 0) {
      return createBadRequestResponse('el rol no es valido', event);
    }

    if (userData.status !== undefined && (typeof userData.status !== 'number' || ![0, 1, 2].includes(userData.status))) {
      return createBadRequestResponse('el estado debe ser inactivo, activo o suspendido', event);
    }
  // puede ser nulo pero si se proporciona, debe ser un número positivo
    if (userData.platform_id !== undefined && (typeof userData.platform_id !== 'number' || userData.platform_id <= 0)) {
      return createBadRequestResponse('la plataforma debe ser valida', event);
    }

    // Usar el servicio para crear el usuario
    const createUserAdminService = new CreateUserAdminService();
    const result = await createUserAdminService.createUserAdmin(userData);


    logInfo(FUNCTION_NAME, 'Usuario admin creado exitosamente', {
      userId: result?.user.id,
      username: result?.user.username,
      roleName: result?.user.role_name
    });

    return createOkResponse(result, 'Usuario admin creado exitosamente', event);

  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Error desconocido';
    
    logError(FUNCTION_NAME, error instanceof Error ? error : 'Error desconocido', {
      requestId: context.awsRequestId,
      event: {
        httpMethod: event.httpMethod,
        path: event.path,
      },
    });

    // Manejar errores específicos
    if (errorMessage.includes('ya existe')) {
      return createConflictResponse(errorMessage, event);
    }

    if (errorMessage.includes('no existe') || errorMessage.includes('contraseña')) {
      return createBadRequestResponse(errorMessage, event);
    }

    return createInternalServerErrorResponse(errorMessage, event);
  }
}; 