import { APIGatewayProxyEvent, APIGatewayProxyResult, Context } from 'aws-lambda';
import { AssignSellerCreditService } from './services/assignSellerCredit.service';
import { AssignSellerCreditRequest } from './dtos/assignSellerCredit.dto';
import { 
  createOkResponse, 
  createBadRequestResponse,
  createUnauthorizedResponse,
  createNotFoundResponse,
  createInternalServerErrorResponse,
  parseRequestBody,
  validateRequiredFields,
  validateAuthorizationHeader,
} from '../../../layers/utils/nodejs/utils';

const FUNCTION_NAME = 'AssignSellerCreditHandler';

/**
 * Handler principal de la función Lambda assignSellerCredit
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

    // Validar autorización JWT
    const authResult = validateAuthorizationHeader(
      event.headers?.Authorization || event.headers?.authorization,
      ['administrador', 'gestor de contenido multimedia', 'vendedor', 'revendedor']
    );

    if (!authResult.isValid) {
      return createUnauthorizedResponse(authResult.error || 'Token de autorización inválido', event);
    }

    // Parsear el body
    const requestData = parseRequestBody<AssignSellerCreditRequest>(event.body);
    if (!requestData) {
      return createBadRequestResponse('Cuerpo de la petición requerido', event);
    }

    // Validar campos requeridos
    const requiredFields = ['created_by_admin_id', 'receiver_admin_id', 'package_seller_id'];
    const validationErrors = validateRequiredFields(requestData, requiredFields);

    if (validationErrors.length > 0) {
      return createBadRequestResponse(
        `Campos requeridos: ${validationErrors.join(', ')}`, 
        event
      );
    }

    // Crear instancia del servicio
    const assignSellerCreditService = new AssignSellerCreditService();

    // Ejecutar la asignación de créditos
    const result = await assignSellerCreditService.assignCredit(requestData);

   if (!result.success) {
      // Determinar el tipo de error apropiado
      if (result.error?.includes('no encontrado')) {
        return createNotFoundResponse(result.error, event);
      } else {
        return createBadRequestResponse(result.error!, event);
      }
    }
    return createOkResponse(
      result.data
    , 'Crédito asignado exitosamente', event);

  } catch (error) {

    return createInternalServerErrorResponse(
      error instanceof Error ? error.message : 'Error interno del servidor',
      event
    );
  }
};