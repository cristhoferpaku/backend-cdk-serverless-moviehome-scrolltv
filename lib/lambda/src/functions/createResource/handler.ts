import { APIGatewayProxyEvent, APIGatewayProxyResult, Context } from 'aws-lambda';
import { CreateResourceService } from './services/createResource.service';
import { CreateResourceRequest } from './dtos/createResource.dto';
import { 
  createOkResponse, 
  createBadRequestResponse,
  createUnauthorizedResponse,
  createForbiddenResponse,
  parseRequestBody,
  validateRequiredFields,
  createInternalServerErrorResponse,
  validateAuthorizationHeader,
} from '../../../layers/utils/nodejs/utils';

const FUNCTION_NAME = 'CreateResourceHandler';
const REQUIRED_ROLES = ['administrador'];   

/**
 * Handler principal de la función Lambda createResource
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
    const authValidation = validateAuthorizationHeader(
      event.headers?.Authorization || event.headers?.authorization,
      REQUIRED_ROLES
    );
    if (!authValidation.isValid) {
      return authValidation.error?.includes('Token') ?
        createUnauthorizedResponse(authValidation.error, event) :
        createForbiddenResponse(authValidation.error, event);
    }
    // Validar que el body existe
    if (!event.body) {
      return createBadRequestResponse('Cuerpo de la petición es requerido', event);
    }
    // Parsear el body
     const body = parseRequestBody<CreateResourceRequest>(event.body);
    if (!body) {
      return createBadRequestResponse('Cuerpo de la petición requerido', event);
    }

    const requiredFields = [
      'name',
      'image',
      'unlinked',
      'downloader',
      'url',
      'platform_id'
    ];
    const validationErrors = validateRequiredFields(body, requiredFields);

    if (validationErrors.length > 0) {
      return createBadRequestResponse(`Faltan campos requeridos: ${validationErrors.join(', ')}`, event);
    }
    const service = new CreateResourceService();
    // Crear el recurso
    const result = await service.createResource(body);

    if (!result.success) {
      return createBadRequestResponse(result.message, event);
    }
    return createOkResponse(result.data, result.message, event);
  } catch (error) {
    return createInternalServerErrorResponse(
      error instanceof Error ? error.message : 'Error interno del servidor',
      event
    );
  }
};