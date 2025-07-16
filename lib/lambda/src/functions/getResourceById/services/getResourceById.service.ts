import { GetResourceByIdRepository } from '../repositories/getResourceById.repo';
import { 
  GetResourceByIdRequestDto, 
  GetResourceByIdResponseDto,
  GetResourceByIdServiceResponseDto,
  GetResourceByIdDatabaseResponseDto 
} from '../dtos/getResourceById.dto';

const SERVICE_NAME = 'GetResourceByIdService';

export class GetResourceByIdService {
  private repository: GetResourceByIdRepository;

  constructor() {
    this.repository = new GetResourceByIdRepository();
  }

  async getResourceById(request: GetResourceByIdRequestDto): Promise<GetResourceByIdServiceResponseDto> { 
    try {
      const databaseResponse: GetResourceByIdDatabaseResponseDto = await this.repository.getResourceById(request.id);
      // Verificar si la operación fue exitosa
      if (!databaseResponse.success) {
        throw new Error(databaseResponse.message);
      }

      // Verificar si se encontró el recurso
      if (!databaseResponse.id) {
        throw new Error('Recurso no encontrado');
      }

      // Mapear la respuesta de la base de datos al DTO de respuesta
      const resource: GetResourceByIdResponseDto = {
        id: databaseResponse.id,
        name: databaseResponse.name!,
        image: databaseResponse.image,
        unlinked: databaseResponse.unlinked,
        downloader: databaseResponse.downloader,
        url: databaseResponse.url,
        state: databaseResponse.state!,
        platform_id: databaseResponse.platform_id!,
        platform_name: databaseResponse.platform_name!,
        created_at: databaseResponse.created_at!,
        updated_at: databaseResponse.updated_at!
      };

    
      return {
        success: true,
        resource: resource
      };
    } catch (error) {
    
      throw error;
    }
  }
}