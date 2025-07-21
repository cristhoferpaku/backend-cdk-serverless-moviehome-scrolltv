import { ChangeCollectionsStatusRepository } from '../repositories/changeCollectionStatus.repo';
import { 
  ChangeCollectionsStatusRequestDto, 
  ChangeCollectionsStatusDatabaseResponseDto 
} from '../dtos/changeCollectionStatus.dto';

const SERVICE_NAME = 'ChangeCollectionsStatusService';

export class ChangeCollectionsStatusService {
  private repository: ChangeCollectionsStatusRepository;

  constructor() {
    this.repository = new ChangeCollectionsStatusRepository();
  }

  async changeCollectionsStatus(request: ChangeCollectionsStatusRequestDto): Promise<{success: boolean; data?: ChangeCollectionsStatusDatabaseResponseDto; error?: string}> {   
    
    try {
      const databaseResponse: ChangeCollectionsStatusDatabaseResponseDto = await this.repository.changeCollectionsStatus(
        request.id, 
        request.status
      );
     
      // Verificar si la operación fue exitosa
      if (!databaseResponse.success) {
        throw new Error(databaseResponse.message);
      }

      // Verificar si se encontró el recurso
      if (!databaseResponse.id) {
        throw new Error('No se pudo cambiar el estado del recurso');
      }

      // Mapear la respuesta de la base de datos al DTO de respuesta
      const Collections: ChangeCollectionsStatusDatabaseResponseDto = {
        id: databaseResponse.id,  
        name: databaseResponse.name!,
        status: databaseResponse.status!,
        success: databaseResponse.success,
        message: databaseResponse.message!
      };

      return {
        success: true,
        data: Collections
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Error interno del servidor'
      };
    }
  }
}