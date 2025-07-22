import { APIGatewayProxyEvent, APIGatewayProxyResult, Context } from 'aws-lambda';
import { ChangeSerieStatusService } from './services/changeSeriesStatus.service';
import { ChangeSerieStatusBody, ChangeSerieStatusRequestDto } from './dtos/changeSeriesStatus.dto';
import { 
  validateAuthorizationHeader, 
  createOkResponse, 
  createBadRequestResponse, 
  createUnauthorizedResponse, 
  validateRequiredFields,
  createInternalServerErrorResponse,
  parseRequestBody
} from '../../../layers/utils/nodejs/utils';

const FUNCTION_NAME = 'ChangeSerieStatusHandler';
const REQUIRED_ROLES = ['administrador', 'gestor de contenido multimedia'];

export const handler = async (
  event: APIGatewayProxyEvent,
  context: Context
): Promise<APIGatewayProxyResult> => {
  
  try {
    // Validar método HTTP
    if (event.httpMethod !== 'PATCH') {
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

    // Validar parámetro SerieId
    // Obtener ID desde pathParameters
    const idParam = event.pathParameters?.id;
    const id = idParam ? parseInt(idParam) : NaN;
    if (!idParam || isNaN(id) || id <= 0) {
      return createBadRequestResponse('El parámetro {id} es requerido y debe ser un número válido', event);
    }
     const body = parseRequestBody<{ status: number }>(event.body);
    if (!body) {
      return createBadRequestResponse('Cuerpo de la petición requerido', event);
    }

    const requiredFields = ['status'];
    const validationErrors = validateRequiredFields(body, requiredFields);
    if (validationErrors.length > 0) {
      return createBadRequestResponse(
        `Faltan campos requeridos: ${validationErrors.join(', ')}`,
        event
      );
    }
   const request: ChangeSerieStatusRequestDto ={
      id: Number(idParam),
      status: body.status
      
    };
    // Ejecutar servicio
    const service = new ChangeSerieStatusService();
    const result = await service.changeSerieStatus(request);

    // Retornar respuesta exitosa

    if (!result.success) {
      return createBadRequestResponse(result.error || 'Error interno del servidor', event);
    }

    return createOkResponse(result.data, result.data?.message || 'Estado de la serie cambiado exitosamente', event);
  } catch (error) {
 

    return createInternalServerErrorResponse('Error interno del servidor', event);
  }
};