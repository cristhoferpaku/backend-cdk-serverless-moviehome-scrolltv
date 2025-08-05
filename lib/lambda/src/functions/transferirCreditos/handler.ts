import { APIGatewayProxyEvent, APIGatewayProxyResult, Context } from 'aws-lambda';
import { TransferirCreditosService } from './services/transferirCreditos.service';
import { TransferirCreditosRequest } from './dtos/transferirCreditos.dto';
import {
  createOkResponse,
  createBadRequestResponse,
  createInternalServerErrorResponse,
  createUnauthorizedResponse,
  validateAuthorizationHeader
} from '../../../layers/utils/nodejs/utils';

const FUNCTION_NAME = 'TransferirCreditosHandler';
const REQUIRED_ROLES = ['administrador','vendedor'];

export const handler = async (
  event: APIGatewayProxyEvent,
  context: Context
): Promise<APIGatewayProxyResult> => {
  try {
    if (event.httpMethod !== 'POST') {
      return createInternalServerErrorResponse('Método HTTP no permitido', event);
    }

    const auth = validateAuthorizationHeader(
      event.headers?.Authorization || event.headers?.authorization,
      REQUIRED_ROLES
    );

    if (!auth.isValid) {
      return createUnauthorizedResponse(auth.error || 'Token inválido', event);
    }

    if (!event.body) {
      return createBadRequestResponse('El cuerpo de la solicitud es requerido', event);
    }
    
    const userId = auth.payload?.userId || 0;
    let requestData: TransferirCreditosRequest;
    try {
      requestData = JSON.parse(event.body);
    } catch (parseError) {
      return createBadRequestResponse('El cuerpo de la solicitud no es un JSON válido', event);
    }

    const service = new TransferirCreditosService();
    const result = await service.transferirCreditos(requestData, userId);

    if (result.success) {
      return createOkResponse(null, result.message, event);
    } else {
      return createBadRequestResponse(result.message, event);
    }
  } catch (error) {
    if (error instanceof Error) {
      // Si es un error de validación, retornar BadRequest
      if (error.message.includes('requerido') || 
          error.message.includes('válido') || 
          error.message.includes('debe estar')) {
        return createBadRequestResponse(error.message, event);
      }
    }

    return createInternalServerErrorResponse(
      error instanceof Error ? error.message : 'Error interno del servidor',
      event
    );
  }
};