import { APIGatewayProxyEvent, APIGatewayProxyResult, Context } from 'aws-lambda';
import { ListLiveTvService } from './services/listLiveTv.service';
import { ListLiveTvRequest } from './dtos/listLiveTv.dto';
import {
  createOkResponse,
  createBadRequestResponse,
  createInternalServerErrorResponse,
  createUnauthorizedResponse,
  validateAuthorizationHeader,
} from '../../../layers/utils/nodejs/utils';

const FUNCTION_NAME = 'ListLiveTvHandler';
const REQUIRED_ROLES = ['administrador', 'gestor de contenido multimedia', ];

export const handler = async (
  event: APIGatewayProxyEvent,
  context: Context
): Promise<APIGatewayProxyResult> => {


  try {
    if (event.httpMethod !== 'GET') {
      return createInternalServerErrorResponse('Método HTTP no permitido', event);
    }

    const auth = validateAuthorizationHeader(
      event.headers?.Authorization || event.headers?.authorization,
      REQUIRED_ROLES
    );

    if (!auth.isValid) {
      return createUnauthorizedResponse(auth.error || 'Token inválido', event);
    }

    // Extraer parámetros de query
    const queryParams = event.queryStringParameters || {};
    
    const requestData: ListLiveTvRequest = {
      search_name: queryParams.search || '',
      status: event.queryStringParameters?.status ? event.queryStringParameters.status.split(',').map(Number) : undefined,
      page: queryParams.page ? parseInt(queryParams.page) : undefined,
      page_size: queryParams.pageSize ? parseInt(queryParams.pageSize) : undefined
    };

    const service = new ListLiveTvService();
    const result = await service.listLiveTv(requestData);
    
   
    
    return createOkResponse(result, 'Canales de TV en vivo obtenidos exitosamente', event);
  } catch (error) {
    return createInternalServerErrorResponse(
      error instanceof Error ? error.message : 'Error interno del servidor',
      event
    );
  }
};