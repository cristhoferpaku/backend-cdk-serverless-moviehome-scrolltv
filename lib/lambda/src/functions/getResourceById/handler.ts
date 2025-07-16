import { APIGatewayProxyEvent, APIGatewayProxyResult, Context } from 'aws-lambda';
import { GetResourceByIdService } from './services/getResourceById.service';
import { GetResourceByIdRequestDto } from './dtos/getResourceById.dto';
import { 
  validateAuthorizationHeader, 
  createOkResponse, 
  createBadRequestResponse, 
  createUnauthorizedResponse, 
  createInternalServerErrorResponse,
} from '../../../layers/utils/nodejs/utils';

const FUNCTION_NAME = 'GetResourceByIdHandler';
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

    // Validar parámetro resourceId
    const resourceId = event.pathParameters?.id;
    if (!resourceId) {
      return createBadRequestResponse('ID del recurso es requerido', event);
    }

    const resourceIdNumber = parseInt(resourceId, 10);
    if (isNaN(resourceIdNumber) || resourceIdNumber <= 0) {
      return createBadRequestResponse('ID del recurso debe ser un número válido mayor a 0', event);
    }

    // Crear request DTO
    const requestDto: GetResourceByIdRequestDto = {
      id: resourceIdNumber,
    };

    // Ejecutar servicio
    const service = new GetResourceByIdService();
    const result = await service.getResourceById(requestDto);


    // Retornar respuesta exitosa
    return createOkResponse(result.resource, 'Recurso obtenido exitosamente', event);
  } catch (error) {

    return createInternalServerErrorResponse('Error interno del servidor', event);
  }
};