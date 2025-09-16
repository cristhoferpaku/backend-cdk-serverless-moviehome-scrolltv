import { APIGatewayProxyEvent, APIGatewayProxyResult, Context } from 'aws-lambda';
import { GetLiveTvsService } from './services/getAllLiveTv.service';
import { 
  createOkResponse, 
  createBadRequestResponse,
  createInternalServerErrorResponse,
  createUnauthorizedResponse,
  createForbiddenResponse,
  validateAuthorizationHeader,

} from '../../../layers/utils/nodejs/utils';

const FUNCTION_NAME = 'GetLiveTvsHandler';

/**
 * Handler principal de la función Lambda getLiveTvs
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
    const authValidation = validateAuthorizationHeader(authHeader, ['administrador', 'cliente']);
    
    if (!authValidation.isValid) {
      if (authValidation.error?.includes('Token')) {
        return createUnauthorizedResponse(authValidation.error, event);
      } else {
        return createForbiddenResponse(authValidation.error || 'Acceso denegado', event);
      }
    }
    // Usar el servicio para obtener todas las plataformas
    const getLiveTvsService = new GetLiveTvsService();
    const result = await getLiveTvsService.getAllLiveTvs();
    return createOkResponse(result.items, result.message, event);

  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Error desconocido';
  
    return createInternalServerErrorResponse(errorMessage, event);
  }
}; 