import { APIGatewayProxyEvent, APIGatewayProxyResult, Context } from 'aws-lambda';
import { GetPackageSellerByIdService } from './services/getPackageSellerById.service';
import { 
  createOkResponse, 
  createBadRequestResponse,
  createNotFoundResponse,
  createUnauthorizedResponse,
  createForbiddenResponse,
  createInternalServerErrorResponse,
  validateAuthorizationHeader,
  logError,
  logInfo 
} from '../../../layers/utils/nodejs/utils';

const FUNCTION_NAME = 'GetPackageSellerByIdHandler';

/**
 * Handler principal de la función Lambda getPackageSellerById
 */
export const handler = async (
  event: APIGatewayProxyEvent,
  context: Context
): Promise<APIGatewayProxyResult> => {
  logInfo(FUNCTION_NAME, 'Iniciando procesamiento de obtener paquete vendedor por ID', {
    requestId: context.awsRequestId,
    httpMethod: event.httpMethod,
    path: event.path,
  });

  try {
    // Validar que sea GET
    if (event.httpMethod !== 'GET') {
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

    // Usar el servicio para obtener el paquete vendedor
    const getPackageSellerByIdService = new GetPackageSellerByIdService();
    const result = await getPackageSellerByIdService.getPackageSellerById(packageSellerId);

    logInfo(FUNCTION_NAME, 'Paquete vendedor obtenido exitosamente', {
      id: result.id,
      name: result.name,
      packageTypeName: result.packageTypeName,
      platformName: result.platformName
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

    if (errorMessage.includes('ID') || errorMessage.includes('número')) {
      return createBadRequestResponse(errorMessage, event);
    }

    return createInternalServerErrorResponse(errorMessage, event);
  }
}; 