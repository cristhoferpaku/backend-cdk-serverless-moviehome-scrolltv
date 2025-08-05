import { APIGatewayProxyEvent, APIGatewayProxyResult, Context } from 'aws-lambda';
import { DeleteTop10Service } from './services/deleteTop10.service';
import {
  createOkResponse,
  createBadRequestResponse,
  createInternalServerErrorResponse,
  createUnauthorizedResponse,
  validateAuthorizationHeader
} from '../../../layers/utils/nodejs/utils';

const FUNCTION_NAME = 'DeleteTop10Handler';
const REQUIRED_ROLES = ['administrador', 'gestor de contenido multimedia'];

export const handler = async (
  event: APIGatewayProxyEvent,
  context: Context
): Promise<APIGatewayProxyResult> => {

  try {
    if (event.httpMethod !== 'DELETE') {
      return createBadRequestResponse('Método HTTP no permitido', event);
    }

    const auth = validateAuthorizationHeader(
      event.headers?.Authorization || event.headers?.authorization,
      REQUIRED_ROLES
    );

    if (!auth.isValid) {
      return createUnauthorizedResponse(auth.error || 'Token inválido', event);
    }

    const id = event.pathParameters?.id;
    if (!id) {
      return createBadRequestResponse('El ID es obligatorio', event);
    }

    const numericId = parseInt(id);
    if (isNaN(numericId) || numericId <= 0) {
      return createBadRequestResponse('El ID debe ser un número positivo', event);
    }

    const service = new DeleteTop10Service();
    const result = await service.deleteTop10(numericId);
    if (!result.success) {
      return createBadRequestResponse(result.message, event);
    }

    return createOkResponse(null, result.message, event);
  } catch (error) {

    if (error instanceof Error && error.message.includes('no encontrado')) {
      return createBadRequestResponse(error.message, event);
    }

    return createInternalServerErrorResponse(
      error instanceof Error ? error.message : 'Error interno del servidor',
      event
    );
  }
};