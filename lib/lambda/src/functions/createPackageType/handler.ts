import { APIGatewayProxyEvent, APIGatewayProxyResult, Context } from 'aws-lambda';
import { CreatePackageTypeService } from './services/createPackageType.service';
import { CreatePackageTypeRequest } from './dtos/createPackageType.dto';
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

const FUNCTION_NAME = 'CreatePackageTypeHandler';

/**
 * Handler principal de la función Lambda createPackageType
 */
export const handler = async (
  event: APIGatewayProxyEvent,
  context: Context
): Promise<APIGatewayProxyResult> => {
  logInfo(FUNCTION_NAME, 'Iniciando procesamiento de creación de tipo de paquete', {
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

   // const userPayload = authValidation.payload!;
    //logInfo(FUNCTION_NAME, 'Usuario autenticado', {
      //userId: userPayload.userId,
      //username: userPayload.username,
      //role: userPayload.roleName
    //});

    // Parsear el body
    const packageTypeData = parseRequestBody<CreatePackageTypeRequest>(event.body);
    if (!packageTypeData) {
      return createBadRequestResponse('Cuerpo de la petición requerido', event);
    }

    // Validar campos requeridos
    const requiredFields = ['name'];
    const validationErrors = validateRequiredFields(packageTypeData, requiredFields);

    if (validationErrors.length > 0) {
      return createBadRequestResponse('El nombre del tipo de paquete es requerido', event);
    }

    // Validaciones básicas adicionales
    if (typeof packageTypeData.name !== 'string' || packageTypeData.name.trim().length === 0) {
      return createBadRequestResponse('El nombre del tipo de paquete debe ser una cadena válida', event);
    }

    // Usar el servicio para crear el tipo de paquete
    const createPackageTypeService = new CreatePackageTypeService();
    const result = await createPackageTypeService.createPackageType(packageTypeData);

    logInfo(FUNCTION_NAME, 'Tipo de paquete creado exitosamente', {
      typeId: result?.id,
      typeName: result?.name
    });

    return createOkResponse(result, 'Tipo de paquete creado exitosamente', event);

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

    if (errorMessage.includes('no válido') || errorMessage.includes('requerido')) {
      return createBadRequestResponse(errorMessage, event);
    }

    return createInternalServerErrorResponse(errorMessage, event);
  }
}; 