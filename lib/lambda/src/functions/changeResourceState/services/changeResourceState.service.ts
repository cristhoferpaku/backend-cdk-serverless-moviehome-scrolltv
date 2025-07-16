import { ChangeResourceStateRepository } from '../repositories/changeResourceState.repo';
import { 
  ChangeResourceStateRequestDto, 
  ChangeResourceStateDatabaseResponseDto 
} from '../dtos/changeResourceState.dto';

const SERVICE_NAME = 'ChangeResourceStateService';

export class ChangeResourceStateService {
  private repository: ChangeResourceStateRepository;

  constructor() {
    this.repository = new ChangeResourceStateRepository();
  }

  async changeResourceState(request: ChangeResourceStateRequestDto): Promise<{success: boolean; data?: ChangeResourceStateDatabaseResponseDto; error?: string}> {
    
    
    try {
      const databaseResponse: ChangeResourceStateDatabaseResponseDto = await this.repository.changeResourceState(
        request.id, 
        request.state
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
      const resource: ChangeResourceStateDatabaseResponseDto = {
        id: databaseResponse.id,
        name: databaseResponse.name!,
        state: databaseResponse.state!,
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