import { APIGatewayProxyEvent, APIGatewayProxyResult, Context } from 'aws-lambda';
import { UpdatePackageSellerService } from './services/updatePackageSeller.service';
import { UpdatePackageSellerRequest } from './dtos/updatePackageSeller.dto';
import { 
  createOkResponse, 
  createBadRequestResponse,
  createNotFoundResponse,
  createConflictResponse,
  createUnauthorizedResponse,
  createForbiddenResponse,
  createInternalServerErrorResponse,
  parseRequestBody,
  validateAuthorizationHeader,
  logError,
  logInfo 
} from '../../../layers/utils/nodejs/utils';

const FUNCTION_NAME = 'UpdatePackageSellerHandler';

/**
 * Handler principal de la función Lambda updatePackageSeller
 */
export const handler = async (
  event: APIGatewayProxyEvent,
  context: Context
): Promise<APIGatewayProxyResult> => {
  logInfo(FUNCTION_NAME, 'Iniciando procesamiento de actualización de paquete vendedor', {
    requestId: context.awsRequestId,
    httpMethod: event.httpMethod,
    path: event.path,
  });

  try {
    // Validar que sea PUT
    if (event.httpMethod !== 'PUT') {
      return createBadRequestResponse('Método HTTP no permitido', event);
    }

    // Validar JWT Token y permisos de administrador
    const authHeader = event.headers.Authorization || event.headers.authorization;
    const authValidation = validateAuthorizationHeader(authHeader, ['administrador', 'gestor de contenido multimedia']);
    
    if (!authValidation.isValid) {
      if (authValidation.error?.includes('Token')) {
        return createUnauthorizedResponse(authValidation.error, event);
      } else {
        return createForbiddenResponse(authValidation.error || 'Acceso denegado', event);
      }
    }

    // Extraer el ID del path parameter
    const id = event.pathParameters?.id;
    if (!id) {
      return createBadRequestResponse('ID del paquete vendedor es requerido', event);
    }

    // Validar que el ID sea un número entero positivo
    const packageSellerId = parseInt(id);
    if (isNaN(packageSellerId) || packageSellerId <= 0) {
      return createBadRequestResponse('ID del paquete vendedor debe ser un número entero positivo', event);
    }

    // Parsear el body
    const updateData = parseRequestBody<UpdatePackageSellerRequest>(event.body);
    if (!updateData) {
      return createBadRequestResponse('Cuerpo de la petición requerido', event);
    }

    // Usar el servicio para actualizar el paquete vendedor
    const updatePackageSellerService = new UpdatePackageSellerService();
    const result = await updatePackageSellerService.updatePackageSeller(packageSellerId, updateData);

    logInfo(FUNCTION_NAME, 'Paquete vendedor actualizado exitosamente', {
      id: result.id,
      name: result.name,
      packageTypeName: result.packageTypeName,
      platformName: result.platformName,
      status: result.status
    });

    return createOkResponse(result, result.message, event);

  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Error desconocido';
    
    logError(FUNCTION_NAME, error instanceof Error ? error : 'Error desconocido', {
      requestId: context.awsRequestId,
      event: {
        httpMethod: event.httpMethod,
        path: event.path,
        pathParameters: event.pathParameters
      },
    });

    // Manejar errores específicos
    if (errorMessage.includes('no encontrado')) {
      return createNotFoundResponse(errorMessage, event);
    }

    if (errorMessage.includes('ya existe')) {
      return createConflictResponse(errorMessage, event);
    }

    if (errorMessage.includes('ID') || 
        errorMessage.includes('número') || 
        errorMessage.includes('campo') ||
        errorMessage.includes('debe ser') ||
        errorMessage.includes('proporcionar') ||
        errorMessage.includes('exceder') ||
        errorMessage.includes('contener') ||
        errorMessage.includes('estado') ||
        errorMessage.includes('crédito') ||
        errorMessage.includes('nombre') ||
        errorMessage.includes('especificado')) {
      return createBadRequestResponse(errorMessage, event);
    }

    return createInternalServerErrorResponse(errorMessage, event);
  }
}; 