import { APIGatewayProxyEvent, APIGatewayProxyResult, Context } from 'aws-lambda';
import { GetCollectionContentService } from './services/getCollectionContent.service';
import { 
  createOkResponse, 
  createBadRequestResponse,
  createInternalServerErrorResponse,
  createUnauthorizedResponse,
  createForbiddenResponse,
  validateAuthorizationHeader,
  logError,
  logInfo 
} from '../../../layers/utils/nodejs/utils';

const FUNCTION_NAME = 'GetCollectionContentHandler';

/**
 * Handler principal de la función Lambda getCollectionContent
 */
export const handler = async (
  event: APIGatewayProxyEvent,
  context: Context
): Promise<APIGatewayProxyResult> => {
  logInfo(FUNCTION_NAME, 'Iniciando procesamiento de obtención de CollectionContents', {
    requestId: context.awsRequestId,
    httpMethod: event.httpMethod,
    path: event.path,
  });

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
    const id = parseInt(event.pathParameters?.id || '0', 10);

    if (isNaN(id) || id <= 0) {
      return createBadRequestResponse('El parámetro {id} es requerido y debe ser un número valido', event);
    }


    // Usar el servicio para obtener todos los CollectionContents
    const getCollectionContentsService = new GetCollectionContentService();
    const result = await getCollectionContentsService.getAllCollectionContent(id, userId);

    return createOkResponse(result.items, result.message, event);

  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Error desconocido';
    
    logError(FUNCTION_NAME, error instanceof Error ? error : 'Error desconocido', {
      requestId: context.awsRequestId,
      event: {
        httpMethod: event.httpMethod,
        path: event.path,
      },
    });

    return createInternalServerErrorResponse(errorMessage, event);
  }
}; 