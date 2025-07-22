import { ChangeSerieStatusRepository } from '../repositories/changeSeriesStatus.repo';
import { 
  ChangeSerieStatusRequestDto, 
  ChangeSerieStatusDatabaseResponseDto 
} from '../dtos/changeSeriesStatus.dto';

const SERVICE_NAME = 'ChangeSerieStatusService';

export class ChangeSerieStatusService {
  private repository: ChangeSerieStatusRepository;

  constructor() {
    this.repository = new ChangeSerieStatusRepository();
  }

  async changeSerieStatus(request: ChangeSerieStatusRequestDto): Promise<{success: boolean; data?: ChangeSerieStatusDatabaseResponseDto; error?: string}> {   
    
    try {
      const databaseResponse: ChangeSerieStatusDatabaseResponseDto = await this.repository.changeSerieStatus(
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
      const Serie: ChangeSerieStatusDatabaseResponseDto = {
        id: databaseResponse.id,  
        name: databaseResponse.name!,
        status: databaseResponse.status!,
        success: databaseResponse.success,
        message: databaseResponse.message!
      };

      return {
        success: true,
        data: Serie
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Error interno del servidor'
      };
    }
  }
}