import { ChangeLiveTvStateRepository } from '../repositories/changeLiveTvStatus.repo';
import { 
  ChangeLiveTvStateRequestDto, 
  ChangeLiveTvStateDatabaseResponseDto 
} from '../dtos/changeLiveTvStatus.dto';

const SERVICE_NAME = 'ChangeLiveTvStateService';

export class ChangeLiveTvStateService {
  private repository: ChangeLiveTvStateRepository;

  constructor() {
    this.repository = new ChangeLiveTvStateRepository();
  }

  async changeLiveTvState(request: ChangeLiveTvStateRequestDto): Promise<{success: boolean; data?: ChangeLiveTvStateDatabaseResponseDto; error?: string}> {
    
    
    try {
      const databaseResponse: ChangeLiveTvStateDatabaseResponseDto = await this.repository.changeLiveTvState(
        request.id, 
        request.status
      );
     
      // Verificar si la operación fue exitosa
      if (!databaseResponse.success) {
        throw new Error(databaseResponse.message);
      }

      // Verificar si se encontró el recurso
      if (!databaseResponse.id) {
        throw new Error('No se pudo cambiar la categoria del canal en vivo del recurso');
      }

      // Mapear la respuesta de la base de datos al DTO de respuesta
      const resource: ChangeLiveTvStateDatabaseResponseDto = {
        id: databaseResponse.id,
        name: databaseResponse.name!,
        url: databaseResponse.url!,
        status: databaseResponse.status!,
        success: databaseResponse.success,
        message: databaseResponse.message!
      };

      return {
        success: true,
        data: resource
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Error interno del servidor'
      };
    }
  }
}