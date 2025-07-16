import { APIGatewayProxyEvent, APIGatewayProxyResult, Context } from 'aws-lambda';
import { GetSellerCreditByIdService } from './services/getSellerCreditById.service';
import { 
  createOkResponse, 
  createBadRequestResponse,
  createInternalServerErrorResponse,
  createUnauthorizedResponse,
  createForbiddenResponse,
  validateAuthorizationHeader,

} from '../../../layers/utils/nodejs/utils';

const FUNCTION_NAME = 'GetPlatformsHandler';
const REQUIRED_ROLES = ['administrador', 'vendedor', 'revendedor'];
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

     const authValidation = validateAuthorizationHeader(
      event.headers?.Authorization || event.headers?.authorization,
      REQUIRED_ROLES
    );

    if (!authValidation.isValid) {
      return authValidation.error?.includes('Token')
        ? createUnauthorizedResponse(authValidation.error, event)
        : createForbiddenResponse(authValidation.error, event);
    }
    if(authValidation.payload?.userId) {
      const userId = Number(authValidation.payload?.userId);
      if(isNaN(userId)) {
        return createBadRequestResponse('El userId no es un número válido', event);
      }
      // Usar el servicio para obtener todas las plataformas
    const getSellerCreditByIdService = new GetSellerCreditByIdService();
    const result = await getSellerCreditByIdService.getSellerCreditById(userId );
    return createOkResponse(result.credit, result.message, event);
    }
    else {
      return createBadRequestResponse('El userId no es un número válido', event);
    }

    

  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Error desconocido';
  
    return createInternalServerErrorResponse(errorMessage, event);
  }
}; 