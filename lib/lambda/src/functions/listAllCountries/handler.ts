import { APIGatewayProxyEvent, APIGatewayProxyResult, Context } from 'aws-lambda';
import { GetCountryService } from './services/listAllCountries.service';
import { 
  createOkResponse, 
  createBadRequestResponse,
  createInternalServerErrorResponse,
  createUnauthorizedResponse,
  createForbiddenResponse,
  validateAuthorizationHeader,
  logError,
  logInfo 
} from '../../../layers/utils/nodejs/utils';

const FUNCTION_NAME = 'GetCountryHandler';

/**
 * Handler principal de la función Lambda getCountry
 */
export const handler = async (
  event: APIGatewayProxyEvent,
  context: Context
): Promise<APIGatewayProxyResult> => {
  logInfo(FUNCTION_NAME, 'Iniciando procesamiento de obtención de Countrys', {
    requestId: context.awsRequestId,
    httpMethod: event.httpMethod,
    path: event.path,
  });

  try {
    // Validar que sea GET
    if (event.httpMethod !== 'GET') {
      return createBadRequestResponse('Método HTTP no permitido', event);
    }

    // Validar JWT Token y permisos
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


    // Usar el servicio para obtener todos los Countrys
    const getCountrysService = new GetCountryService();
    const result = await getCountrysService.getAllCountry();

    return createOkResponse(result, result.message, event);

  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Error desconocido';
    
    logError(FUNCTION_NAME, error instanceof Error ? error : 'Error desconocido', {
      requestId: context.awsRequestId,
      event: {
        httpMethod: event.httpMethod,
        path: event.path,
      },
    });

    return createInternalServerErrorResponse(errorMessage, event);
  }
}; 