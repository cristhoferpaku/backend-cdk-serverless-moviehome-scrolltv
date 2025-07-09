import { APIGatewayProxyEvent, APIGatewayProxyResult, Context } from 'aws-lambda';
import { CreatePackageSellerService } from './services/createPackageSeller.service';
import { CreatePackageSellerRequest } from './dtos/createPackageSeller.dto';
import { 
  createOkResponse, 
  createBadRequestResponse,
  createInternalServerErrorResponse,
  createConflictResponse,
  createUnauthorizedResponse,
  createForbiddenResponse,
  parseRequestBody,
  validateRequiredFields,
  validateAuthorizationHeader,
  logError,
  logInfo 
} from '../../../layers/utils/nodejs/utils';

const FUNCTION_NAME = 'CreatePackageSellerHandler';

/**
 * Handler principal de la función Lambda createPackageSeller
 */
export const handler = async (
  event: APIGatewayProxyEvent,
  context: Context
): Promise<APIGatewayProxyResult> => {
  logInfo(FUNCTION_NAME, 'Iniciando procesamiento de creación de paquete vendedor', {
    requestId: context.awsRequestId,
    httpMethod: event.httpMethod,
    path: event.path,
  });

  try {
    // Validar que sea POST
    if (event.httpMethod !== 'POST') {
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

    const userPayload = authValidation.payload!;
    logInfo(FUNCTION_NAME, 'Usuario autenticado', {
      userId: userPayload.userId,
      username: userPayload.username,
      role: userPayload.roleName
    });

    // Parsear el body
    const packageData = parseRequestBody<CreatePackageSellerRequest>(event.body);
    if (!packageData) {
      return createBadRequestResponse('Cuerpo de la petición requerido', event);
    }

    // Validar campos requeridos
    const requiredFields = ['name', 'credit', 'package_type_id'];
    const validationErrors = validateRequiredFields(packageData, requiredFields);

    if (validationErrors.length > 0) {
      return createBadRequestResponse('El nombre, crédito y tipo de paquete son requeridos', event);
    }

    // Validaciones básicas (el stored procedure se encarga de las validaciones de negocio)
    if (typeof packageData.credit !== 'number' || packageData.credit < 0) {
      return createBadRequestResponse('El crédito debe ser un número positivo', event);
    }

    if (typeof packageData.package_type_id !== 'number' || packageData.package_type_id <= 0) {
      return createBadRequestResponse('El tipo de paquete no es válido', event);
    }

    if (packageData.status !== undefined && (typeof packageData.status !== 'number' || ![0, 1].includes(packageData.status))) {
      return createBadRequestResponse('El estado debe ser inactivo (0) o activo (1)', event);
    }

    // platform_id puede ser nulo pero si se proporciona, debe ser un número positivo
    if (packageData.platform_id !== undefined && (typeof packageData.platform_id !== 'number' || packageData.platform_id <= 0)) {
      return createBadRequestResponse('La plataforma debe ser válida', event);
    }

    // Usar el servicio para crear el paquete vendedor
    const createPackageSellerService = new CreatePackageSellerService();
    const result = await createPackageSellerService.createPackageSeller(packageData);

    logInfo(FUNCTION_NAME, 'Paquete vendedor creado exitosamente', {
      packageId: result?.id,
      packageName: result?.name,
      packageType: result?.package_type_name
    });

    return createOkResponse(result, 'Paquete vendedor creado exitosamente', event);

  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Error desconocido';
    
    logError(FUNCTION_NAME, error instanceof Error ? error : 'Error desconocido', {
      requestId: context.awsRequestId,
      event: {
        httpMethod: event.httpMethod,
        path: event.path,
      },
    });

    // Manejar errores específicos
    if (errorMessage.includes('ya existe')) {
      return createConflictResponse(errorMessage, event);
    }

    if (errorMessage.includes('no existe') || errorMessage.includes('no es válido')) {
      return createBadRequestResponse(errorMessage, event);
    }

    return createInternalServerErrorResponse(errorMessage, event);
  }
}; 