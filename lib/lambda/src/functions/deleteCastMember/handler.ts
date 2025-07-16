import { APIGatewayProxyEvent, APIGatewayProxyResult, Context } from 'aws-lambda';
import { DeleteCastMemberService } from './services/deleteCastMember.service';
import {
  createOkResponse,
  createBadRequestResponse,
  createInternalServerErrorResponse,
  createUnauthorizedResponse,
  createForbiddenResponse,
  validateAuthorizationHeader
} from '../../../layers/utils/nodejs/utils';

const FUNCTION_NAME = 'DeleteCastMemberHandler';
const REQUIRED_ROLES = ['administrador','vendedor','revendedor'];

export const handler = async (
  event: APIGatewayProxyEvent,
  context: Context
): Promise<APIGatewayProxyResult> => {


  try {
    if (event.httpMethod !== 'DELETE') {
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

    const idParam = event.pathParameters?.id;
    const id = idParam ? parseInt(idParam) : NaN;
    if (!idParam || isNaN(id) || id <= 0) {
      return createBadRequestResponse('El parámetro {id} es requerido y debe ser un número válido', event);
    }

    const service = new DeleteCastMemberService();
    const result = await service.deleteCastMember({ id });

    if (!result.success) {
      return createBadRequestResponse(result.message, event);
    }
    
    return createOkResponse(null, result.message, event);

  } catch (error) {
    return createInternalServerErrorResponse(
      error instanceof Error ? error.message : 'Error interno del servidor',
      event
    );
  }
};
