import { ChangeMultimediaCategoriesStatusRepository } from '../repositories/changeMultimediaCategoryStatus.repo';
import { 
  ChangeMultimediaCategoriesStatusRequestDto, 
  ChangeMultimediaCategoriesStatusDatabaseResponseDto 
} from '../dtos/changeMultimediaCategoryStatus.dto';

const SERVICE_NAME = 'ChangeMultimediaCategoriesStatusService';

export class ChangeMultimediaCategoriesStatusService {
  private repository: ChangeMultimediaCategoriesStatusRepository;

  constructor() {
    this.repository = new ChangeMultimediaCategoriesStatusRepository();
  }

  async changeMultimediaCategoriesStatus(request: ChangeMultimediaCategoriesStatusRequestDto): Promise<{success: boolean; data?: ChangeMultimediaCategoriesStatusDatabaseResponseDto; error?: string}> {   
    
    try {
      const databaseResponse: ChangeMultimediaCategoriesStatusDatabaseResponseDto = await this.repository.changeMultimediaCategoriesStatus(
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
      const MultimediaCategories: ChangeMultimediaCategoriesStatusDatabaseResponseDto = {
        id: databaseResponse.id,  
        name: databaseResponse.name!,
        status: databaseResponse.status!,
        success: databaseResponse.success,
        message: databaseResponse.message!
      };

      return {
        success: true,
        data: MultimediaCategories
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Error interno del servidor'
      };
    }
  }
}