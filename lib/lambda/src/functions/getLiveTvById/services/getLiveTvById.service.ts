import { GetLiveTvByIdRepository } from '../repositories/getLiveTvById.repo';
import { 
  GetLiveTvByIdRequest, 
  GetLiveTvByIdResponse,
  GetLiveTvByIdServiceResponse,
  GetLiveTvByIdDbResult 
} from '../dtos/getLiveTvById.dto';

const FUNCTION_NAME = 'GetLiveTvByIdService';

export class GetLiveTvByIdService {
  private repository: GetLiveTvByIdRepository;

  constructor() {
    this.repository = new GetLiveTvByIdRepository();
  }

  async getLiveTvById(request: GetLiveTvByIdRequest): Promise<GetLiveTvByIdServiceResponse> { 
    try {
      // Validar ID
      if (!request.id || request.id <= 0) {
        return {
          success: false,
          message: 'ID inválido. Debe ser un número mayor a 0.'
        };
      }

      const databaseResponse: GetLiveTvByIdDbResult = await this.repository.getLiveTvById(request.id);
      
      // Verificar si la operación fue exitosa
      if (!databaseResponse.success) {
        return {
          success: false,
          message: databaseResponse.message
        };
      }

      // Verificar si se encontró el canal
      if (!databaseResponse.id) {
        return {
          success: false,
          message: 'Canal de TV en vivo no encontrado'
        };
      }

      // Mapear la respuesta de la base de datos al DTO de respuesta
      const liveTvChannel: GetLiveTvByIdResponse = {
        id: databaseResponse.id,
        name: databaseResponse.name!,
        url: databaseResponse.url!,
        status: databaseResponse.status!,
        created_at: databaseResponse.created_at!,
        updated_at: databaseResponse.updated_at!
      };

      return {
        success: true,
        data: liveTvChannel,
        message: 'Canal de TV en vivo obtenido exitosamente'
      };
    } catch (error) {
      console.error(`[${FUNCTION_NAME}] Error al obtener canal de TV en vivo:`, error);
      return {
        success: false,
        message: 'Error interno del servidor al obtener el canal de TV en vivo'
      };
    }
  }
}