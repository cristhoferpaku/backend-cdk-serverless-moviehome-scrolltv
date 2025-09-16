import { APIGatewayProxyEvent, APIGatewayProxyResult, Context } from 'aws-lambda';
import { CreateLiveTvService } from './services/createLiveTv.service';
import { CreateLiveTvRequest } from './dtos/createLiveTv.dto';
import {
  createOkResponse,
  createBadRequestResponse,
  createInternalServerErrorResponse,
  createUnauthorizedResponse,
  validateAuthorizationHeader,
} from '../../../layers/utils/nodejs/utils';

const FUNCTION_NAME = 'CreateLiveTvHandler';
const REQUIRED_ROLES = ['administrador', 'gestor de contenido multimedia'];

export const handler = async (
  event: APIGatewayProxyEvent,
  context: Context
): Promise<APIGatewayProxyResult> => {


  try {
    if (event.httpMethod !== 'POST') {
      return createBadRequestResponse('Método HTTP no permitido', event);
    }

    const auth = validateAuthorizationHeader(
      event.headers?.Authorization || event.headers?.authorization,
      REQUIRED_ROLES
    );

    if (!auth.isValid) {
      return createUnauthorizedResponse(auth.error || 'Token inválido', event);
    }

    if (!event.body) {
      return createBadRequestResponse('El cuerpo de la solicitud es obligatorio', event);
    }

    let requestData: CreateLiveTvRequest;
    try {
      requestData = JSON.parse(event.body);
    } catch (error) {
      return createBadRequestResponse('El cuerpo de la solicitud debe ser un JSON válido', event);
    }

    const service = new CreateLiveTvService();
    const result = await service.createLiveTv(requestData);
    
    if (!result.success) {
      return createBadRequestResponse(result.message, event);
    }

    return createOkResponse(result.data, result.message, event);
  } catch (error) {
    
    if (error instanceof Error && error.message.includes('obligatorio')) {
      return createBadRequestResponse(error.message, event);
    }

    return createInternalServerErrorResponse(
      error instanceof Error ? error.message : 'Error interno del servidor',
      event
    );
  }
};