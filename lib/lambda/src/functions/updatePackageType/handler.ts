import { APIGatewayProxyEvent, APIGatewayProxyResult, Context } from 'aws-lambda';
import { UpdatePackageTypeService } from './services/updatePackageType.service';
import { UpdatePackageTypeRequest } from './dtos/updatePackageType.dto';
import { 
  createOkResponse, 
  createBadRequestResponse,
  createNotFoundResponse,
  createConflictResponse,
  createUnauthorizedResponse,
  createInternalServerErrorResponse,
  parseRequestBody,
  validateRequiredFields,
  validateAuthorizationHeader,
  logError,
  logInfo 
} from '../../../layers/utils/nodejs/utils';

const FUNCTION_NAME = 'UpdatePackageTypeHandler';

/**
 * Handler principal de la función Lambda updatePackageType
 */
export const handler = async (
  event: APIGatewayProxyEvent,
  context: Context
): Promise<APIGatewayProxyResult> => {
  logInfo(FUNCTION_NAME, 'Iniciando procesamiento de actualización de tipo de paquete', {
    requestId: context.awsRequestId,
    httpMethod: event.httpMethod,
    path: event.path,
  });

  try {
    // Validar que sea PUT
    if (event.httpMethod !== 'PUT') {
      return createBadRequestResponse('Método HTTP no permitido', event);
    }

    // Validar JWT y roles
    const authValidation = await validateAuthorizationHeader(
      event.headers.Authorization || event.headers.authorization,
      ['administrador', 'gestor de contenido multimedia']
    );

    if (!authValidation.isValid) {
      return createUnauthorizedResponse(authValidation.error || 'Token de autorización inválido', event);
    }

    // Obtener ID del path parameter
    const packageTypeId = event.pathParameters?.id;
    if (!packageTypeId) {
      return createBadRequestResponse('ID del tipo de paquete requerido en el path', event);
    }

    const id = parseInt(packageTypeId, 10);
    if (isNaN(id) || id <= 0) {
      return createBadRequestResponse('ID del tipo de paquete debe ser un número válido mayor a 0', event);
    }

    // Parsear el body
    const updateData = parseRequestBody<UpdatePackageTypeRequest>(event.body);
    if (!updateData) {
      return createBadRequestResponse('Cuerpo de la petición requerido', event);
    }

    // Validar campos requeridos
    const requiredFields = ['name'];
    const validationErrors = validateRequiredFields(updateData, requiredFields);

    if (validationErrors.length > 0) {
      return createBadRequestResponse('El nombre es requerido', event);
    }

    // Usar el servicio para actualizar
    const updatePackageTypeService = new UpdatePackageTypeService();
    const updateResult = await updatePackageTypeService.updatePackageType(id, updateData);

    logInfo(FUNCTION_NAME, 'Tipo de paquete actualizado exitosamente', {
      id: updateResult.id,
      name: updateResult.name,
      status: updateResult.status || null
    });

    return createOkResponse(updateResult, 'Tipo de paquete actualizado exitosamente', event);

  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Error desconocido';
    
    // Manejar errores específicos
    if (errorMessage.includes('no encontrado')) {
      return createNotFoundResponse('Tipo de paquete no encontrado', event);
    }
    
    if (errorMessage.includes('ya existe')) {
      return createConflictResponse('El nombre del tipo de paquete ya existe', event);
    }

    if (errorMessage.includes('nombre debe tener') || errorMessage.includes('solo puede contener')) {
      return createBadRequestResponse(errorMessage, event);
    }

    logError(FUNCTION_NAME, errorMessage, {
      requestId: context.awsRequestId,
      event: {
        httpMethod: event.httpMethod,
        path: event.path,
        pathParameters: event.pathParameters
      },
    });

    return createInternalServerErrorResponse(errorMessage, event);
  }
}; 