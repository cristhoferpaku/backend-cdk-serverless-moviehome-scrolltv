import { APIGatewayProxyEvent, APIGatewayProxyResult, Context } from 'aws-lambda';
import { ChangePackageUserStatusService } from './services/changePackageUserStatus.service';
import { ChangePackageUserStatusRequest } from './dtos/changePackageUserStatus.dto';
import { 
  createOkResponse, 
  createBadRequestResponse,
  createUnauthorizedResponse,
  createInternalServerErrorResponse,
  createNotFoundResponse,
  parseRequestBody,
  validateAuthorizationHeader 
} from '../../../layers/utils/nodejs/utils';

const FUNCTION_NAME = 'ChangePackageUserStatusHandler';

/**
 * Handler principal de la función Lambda changePackageUserStatus
 */
export const handler = async (
  event: APIGatewayProxyEvent,
  context: Context
): Promise<APIGatewayProxyResult> => {
  

  try {
    // Validar que sea PATCH
    if (event.httpMethod !== 'PATCH') {
      return createBadRequestResponse('Método HTTP no permitido', event);
    }

    // Validar autorización JWT
    const authValidation = validateAuthorizationHeader(
      event.headers.Authorization || event.headers.authorization,
      ['administrador', 'gestor de contenido multimedia'] // Roles permitidos
    );

    if (!authValidation.isValid) {
      return createUnauthorizedResponse(authValidation.error || 'No autorizado', event);
    }

    // Extraer ID del path parameter
    const packageUserId = event.pathParameters?.id;
    if (!packageUserId || isNaN(parseInt(packageUserId))) {
      return createBadRequestResponse('ID del paquete de usuario requerido y debe ser un número válido', event);
    }

    const id = parseInt(packageUserId);

    // Parsear el body
    const statusData = parseRequestBody<ChangePackageUserStatusRequest>(event.body);
    if (!statusData) {
      return createBadRequestResponse('Cuerpo de la petición requerido', event);
    }

    // Validar que el status esté presente
    if (statusData.status === undefined || statusData.status === null) {
      return createBadRequestResponse('El campo "status" es requerido', event);
    }

    // Usar el servicio para cambiar el status
    const changePackageUserStatusService = new ChangePackageUserStatusService();
    const result = await changePackageUserStatusService.changePackageUserStatus(id, statusData);

    return createOkResponse(result, result.message, event);

  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Error desconocido';
    
    // Manejar errores específicos
    if (errorMessage.includes('no encontrado')) {
      return createNotFoundResponse(errorMessage, event);
    }

    if (errorMessage.includes('inválido') || 
        errorMessage.includes('debe ser') || 
        errorMessage.includes('es requerido')) {
      return createBadRequestResponse(errorMessage, event);
    }



    return createInternalServerErrorResponse(errorMessage, event);
  }
}; 