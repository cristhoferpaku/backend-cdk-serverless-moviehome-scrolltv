import { APIGatewayProxyEvent, APIGatewayProxyResult, Context } from 'aws-lambda';
import { CreatePackageUserService } from './services/createPackageUser.service';
import { CreatePackageUserRequest } from './dtos/createPackageUser.dto';
import {
  createOkResponse,
  createCreatedResponse,
  createBadRequestResponse,
  createUnauthorizedResponse,
  createForbiddenResponse,
  createConflictResponse,
  createValidationErrorResponse,
  createInternalServerErrorResponse,
  parseRequestBody,
  validateRequiredFields,
  validateAuthorizationHeader,
  logError,
} from '../../../layers/utils/nodejs/utils';

const FUNCTION_NAME = 'CreatePackageUserHandler';
const REQUIRED_ROLES = ['administrador', 'gestor de contenido multimedia'];

/**
 * Handler principal de la función Lambda createPackageUser
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

    // Validar autorización JWT
    const authValidation = validateAuthorizationHeader(
      event.headers?.Authorization || event.headers?.authorization,
      REQUIRED_ROLES
    );

    if (!authValidation.isValid) {
      if (authValidation.error === 'Token de autorización requerido' || 
          authValidation.error === 'Token inválido' || 
          authValidation.error === 'Token JWT inválido o expirado') {
        return createUnauthorizedResponse(authValidation.error, event);
      } else {
        return createForbiddenResponse(authValidation.error, event);
      }
    }

    // Parsear el body
    const packageUserData = parseRequestBody<CreatePackageUserRequest>(event.body);
    if (!packageUserData) {
      return createBadRequestResponse('Cuerpo de la petición requerido', event);
    }

    // Validar campos requeridos
    const requiredFields = ['name', 'package_type_id', 'platform_id', 'duration_value', 'duration_type'];
    const validationErrors = validateRequiredFields(packageUserData, requiredFields);

    if (validationErrors.length > 0) {
      return createValidationErrorResponse(
        'Faltan campos requeridos',
        validationErrors,
        event
      );
    }

    // Usar el servicio para crear el paquete de usuario
    const createPackageUserService = new CreatePackageUserService();
    const result = await createPackageUserService.createPackageUser(packageUserData);

    if (!result.success) {
      // Determinar el tipo de error basado en el mensaje
      if (result.message.includes('ya existe') || result.message.includes('Ya existe')) {
        return createConflictResponse(result.message, event);
      }
      
      if (result.message.includes('no existe') || 
          result.message.includes('no encontrado') ||
          result.message.includes('especificado no existe')) {
        return createBadRequestResponse(result.message, event);
      }

      if (result.message.includes('requerido') || 
          result.message.includes('debe ser') ||
          result.message.includes('inválido')) {
        return createBadRequestResponse(result.message, event);
      }

      return createInternalServerErrorResponse(result.message, event);
    }

  
    return createCreatedResponse(result.data, result.message, event);

  } catch (error) {
    logError(FUNCTION_NAME, error instanceof Error ? error : 'Error desconocido', {
      requestId: context.awsRequestId,
      event: {
        httpMethod: event.httpMethod,
        path: event.path,
      },
    });

    if (error instanceof Error) {
      if (error.message.includes('JSON')) {
        return createBadRequestResponse('Formato JSON inválido', event);
      }
    }

    return createInternalServerErrorResponse(
      error instanceof Error ? error.message : 'Error interno del servidor',
      event
    );
  }
}; 