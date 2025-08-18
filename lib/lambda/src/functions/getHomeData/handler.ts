import { APIGatewayProxyEvent, APIGatewayProxyResult, Context } from 'aws-lambda';
import { GetHomeService } from './services/getHomeData.service';
import { 
  createOkResponse, 
  createBadRequestResponse,
  createInternalServerErrorResponse,
  createUnauthorizedResponse,
  createForbiddenResponse,
  validateAuthorizationHeader
} from '../../../layers/utils/nodejs/utils';

const FUNCTION_NAME = 'GetHomeHandler';

/**
 * Handler principal de la función Lambda getHome
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
    const authValidation = validateAuthorizationHeader(authHeader, ['administrador', 'gestor de contenido multimedia','cliente']);
    
    if (!authValidation.isValid) {
      if (authValidation.error?.includes('Token')) {
        return createUnauthorizedResponse(authValidation.error, event);
      } else {
        return createForbiddenResponse(authValidation.error || 'Acceso denegado', event);
      }
    } 
    // Usar el servicio para obtener todos los Home
    const sectionIdStr = event.queryStringParameters?.sectionId ?? event.queryStringParameters?.section_id;
    const sectionId = Number(sectionIdStr);
        if (!sectionIdStr || Number.isNaN(sectionId) || sectionId <= 0) {
      return createBadRequestResponse('Parámetro "sectionId" es requerido y debe ser un número > 0', event);
    }
    const getHomeService = new GetHomeService();
    const result = await getHomeService.getAllHome(sectionId);

    return createOkResponse(result.data, result.message, event);

  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Error desconocido';

    return createInternalServerErrorResponse(errorMessage, event);
  }
}; 