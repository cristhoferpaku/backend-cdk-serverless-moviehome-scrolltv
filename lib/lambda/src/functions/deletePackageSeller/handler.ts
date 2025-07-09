import { APIGatewayProxyEvent, APIGatewayProxyResult, Context } from 'aws-lambda';
import { DeletePackageSellerService } from './services/deletePackageSeller.service';
import { DeletePackageSellerRequest } from './dtos/deletePackageSeller.dto';
import { 
  createOkResponse, 
  createBadRequestResponse,
  createInternalServerErrorResponse,
  createUnauthorizedResponse,
  createForbiddenResponse,
  createNotFoundResponse,
  validateAuthorizationHeader,
  logError,
  logInfo 
} from '../../../layers/utils/nodejs/utils';

const FUNCTION_NAME = 'DeletePackageSellerHandler';

/**
 * Handler principal de la función Lambda deletePackageSeller
 */
export const handler = async (
  event: APIGatewayProxyEvent,
  context: Context
): Promise<APIGatewayProxyResult> => {
  logInfo(FUNCTION_NAME, 'Iniciando procesamiento de eliminación de paquete vendedor', {
    requestId: context.awsRequestId,
    httpMethod: event.httpMethod,
    path: event.path,
  });

  try {
    // Validar que sea DELETE
    if (event.httpMethod !== 'DELETE') {
      return createBadRequestResponse('Método HTTP no permitido', event);
    }

    // Validar JWT Token y permisos de administrador
    const authHeader = event.headers.Authorization || event.headers.authorization;
    const authValidation = validateAuthorizationHeader(authHeader, ['administrador']);
    
    if (!authValidation.isValid) {
      if (authValidation.error?.includes('Token')) {
        return createUnauthorizedResponse(authValidation.error, event);
      } else {
        return createForbiddenResponse(authValidation.error || 'Acceso denegado', event);
      }
    }

    // Extraer el ID del path parameter
    const packageSellerId = event.pathParameters?.id;
    
    if (!packageSellerId) {
      return createBadRequestResponse('ID de paquete vendedor requerido en la URL', event);
    }

    // Validar que el ID sea numérico
    const numericId = parseInt(packageSellerId);
    if (isNaN(numericId) || numericId <= 0) {
      return createBadRequestResponse('ID de paquete vendedor debe ser un número entero positivo', event);
    }

    const requestData: DeletePackageSellerRequest = {
      id: numericId
    };

    // Usar el servicio para eliminar el paquete vendedor
    const deletePackageSellerService = new DeletePackageSellerService();
    const result = await deletePackageSellerService.deletePackageSeller(requestData);

    // Verificar resultado
    if (!result.success) {
      if (result.message.includes('no encontrado')) {
        return createNotFoundResponse(result.message, event);
      }
      return createBadRequestResponse(result.message, event);
    }

    logInfo(FUNCTION_NAME, 'Paquete vendedor eliminado exitosamente', {
      packageSellerId: numericId,
      message: result.message
    });

    return createOkResponse(result, 'Paquete vendedor eliminado exitosamente', event);

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
    if (errorMessage.includes('ID') || errorMessage.includes('número')) {
      return createBadRequestResponse(errorMessage, event);
    }

    return createInternalServerErrorResponse(errorMessage, event);
  }
}; 