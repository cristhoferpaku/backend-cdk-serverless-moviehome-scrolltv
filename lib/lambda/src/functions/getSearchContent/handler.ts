import { APIGatewayProxyEvent, APIGatewayProxyResult, Context } from 'aws-lambda';
import { GetSearchContentService } from './services/getSearchContent.service';
import { 
  createOkResponse, 
  createBadRequestResponse,
  createInternalServerErrorResponse,
  createUnauthorizedResponse,
  createForbiddenResponse,
  validateAuthorizationHeader,
} from '../../../layers/utils/nodejs/utils';

const FUNCTION_NAME = 'GetSearchContentHandler';

/**
 * Handler principal de la función Lambda getSearchContent
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
    const authValidation = validateAuthorizationHeader(authHeader, ['administrador', 'gestor de contenido multimedia', 'cliente']);
    
    if (!authValidation.isValid) {
      if (authValidation.error?.includes('Token')) {
        return createUnauthorizedResponse(authValidation.error, event);
      } else {
        return createForbiddenResponse(authValidation.error || 'Acceso denegado', event);
      }
    }

    const userPayload = authValidation.payload!;
    const userId = userPayload.userId;
    const search = event.queryStringParameters?.search || '';

    // Usar el servicio para obtener todos los SearchContents
    const getSearchContentsService = new GetSearchContentService();
    const result = await getSearchContentsService.getAllSearchContent(search, userId);

    return createOkResponse(result.items, result.message, event);

  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Error desconocido';
    return createInternalServerErrorResponse(errorMessage, event);
  }
}; 