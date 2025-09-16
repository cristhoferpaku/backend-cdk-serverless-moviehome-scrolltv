import { APIGatewayProxyEvent, APIGatewayProxyResult, Context } from 'aws-lambda';
import { GetLiveTvByIdService } from './services/getLiveTvById.service';
import { GetLiveTvByIdRequest } from './dtos/getLiveTvById.dto';
import { 
  validateAuthorizationHeader, 
  createOkResponse, 
  createBadRequestResponse, 
  createUnauthorizedResponse, 
  createInternalServerErrorResponse,
} from '../../../layers/utils/nodejs/utils';

const FUNCTION_NAME = 'GetLiveTvByIdHandler';
const REQUIRED_ROLES = ['administrador', 'gestor de contenido multimedia'];

export const handler = async (
  event: APIGatewayProxyEvent,
  context: Context
): Promise<APIGatewayProxyResult> => {


  try {
    // Validar método HTTP
    if (event.httpMethod !== 'GET') {
      return createBadRequestResponse('Método HTTP no permitido', event);
    }

    // Validar autorización
    const authResult = validateAuthorizationHeader(
      event.headers?.Authorization || event.headers?.authorization,
      REQUIRED_ROLES
    );

    if (!authResult.isValid) {
      return createUnauthorizedResponse(authResult.error || 'No autorizado', event);
    }

    // Validar parámetro id
    const liveTvId = event.pathParameters?.id;
    if (!liveTvId) {
      return createBadRequestResponse('ID del canal de TV en vivo es requerido', event);
    }

    const liveTvIdNumber = parseInt(liveTvId, 10);
    if (isNaN(liveTvIdNumber) || liveTvIdNumber <= 0) {
      return createBadRequestResponse('ID del canal de TV en vivo debe ser un número válido mayor a 0', event);
    }

    // Crear request DTO
    const requestDto: GetLiveTvByIdRequest = {
      id: liveTvIdNumber,
    };

    // Ejecutar servicio
    const service = new GetLiveTvByIdService();
    const result = await service.getLiveTvById(requestDto);

    // Verificar si el servicio fue exitoso
    if (!result.success) {
      return createBadRequestResponse(result.message, event);
    }

    // Retornar respuesta exitosa
    return createOkResponse(result.data, result.message, event);
  } catch (error) {

    return createInternalServerErrorResponse('Error interno del servidor', event);
  }
};