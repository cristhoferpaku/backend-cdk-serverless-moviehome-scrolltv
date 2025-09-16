import { APIGatewayProxyEvent, APIGatewayProxyResult, Context } from 'aws-lambda';
import { GetContentDataDetailService } from './services/getContentDataDetail.service';
import { 
  createOkResponse, 
  createBadRequestResponse,
  createInternalServerErrorResponse,
  createUnauthorizedResponse,
  createForbiddenResponse,
  validateAuthorizationHeader
} from '../../../layers/utils/nodejs/utils';

const FUNCTION_NAME = 'GetContentDataDetailHandler';

/**
 * Handler principal de la función Lambda getContentDataDetail
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

    // Obtener contentId de los parámetros de consulta o path parameters
    const idParam = event.pathParameters?.id;
    const id = idParam ? parseInt(idParam) : NaN;

    if (!idParam || isNaN(id) || id <= 0) {
      return createBadRequestResponse('El parámetro {id} es requerido y debe ser un número válido', event);
    }

    // Usar el servicio para obtener el detalle del contenido
    const getContentDataDetailService = new GetContentDataDetailService();
    const result = await getContentDataDetailService.getContentDetail({id});

    // Si el contenido no fue encontrado, retornar error 404
    if (!result.success) {
      return createBadRequestResponse(result.message, event);
    }

    return createOkResponse(result.data, result.message, event);

  } catch (error) {
    console.error(`${FUNCTION_NAME} - Error:`, error);
    const errorMessage = error instanceof Error ? error.message : 'Error desconocido';

    return createInternalServerErrorResponse(errorMessage, event);
  }
};