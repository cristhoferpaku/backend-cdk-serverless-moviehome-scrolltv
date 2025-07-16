import { APIGatewayProxyEvent, APIGatewayProxyResult, Context } from 'aws-lambda';
import { GetPlatformsService } from './services/getPlatforms.service';
import { 
  createOkResponse, 
  createBadRequestResponse,
  createInternalServerErrorResponse,
  createUnauthorizedResponse,
  createForbiddenResponse,
  validateAuthorizationHeader,

} from '../../../layers/utils/nodejs/utils';

const FUNCTION_NAME = 'GetPlatformsHandler';

/**
 * Handler principal de la función Lambda getPlatforms
 */
export const handler = async (
  event: APIGatewayProxyEvent,
  context: Context
): Promise<APIGatewayProxyResult> => {
 

  try {
    // Validar que sea GET
    if (event.httpMethod !== 'GET') {
      return createBadRequestResponse('Método HTTP no permitido', event);
    }

    // Validar JWT Token y permisos
    const authHeader = event.headers.Authorization || event.headers.authorization;
    const authValidation = validateAuthorizationHeader(authHeader, ['administrador', 'gestor de contenido multimedia']);
    
    if (!authValidation.isValid) {
      if (authValidation.error?.includes('Token')) {
        return createUnauthorizedResponse(authValidation.error, event);
      } else {
        return createForbiddenResponse(authValidation.error || 'Acceso denegado', event);
      }
    }
    // Usar el servicio para obtener todas las plataformas
    const getPlatformsService = new GetPlatformsService();
    const result = await getPlatformsService.getAllPlatforms();
    return createOkResponse(result.items, result.message, event);

  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Error desconocido';
  
    return createInternalServerErrorResponse(errorMessage, event);
  }
}; 