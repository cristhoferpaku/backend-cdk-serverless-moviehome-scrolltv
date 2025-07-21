import { ChangeMovieStatusRepository } from '../repositories/changeMovieStatus.repo';
import { 
  ChangeMovieStatusRequestDto, 
  ChangeMovieStatusDatabaseResponseDto 
} from '../dtos/changeMovieStatus.dto';

const SERVICE_NAME = 'ChangeMovieStatusService';

export class ChangeMovieStatusService {
  private repository: ChangeMovieStatusRepository;

  constructor() {
    this.repository = new ChangeMovieStatusRepository();
  }

  async changeMovieStatus(request: ChangeMovieStatusRequestDto): Promise<{success: boolean; data?: ChangeMovieStatusDatabaseResponseDto; error?: string}> {   
    
    try {
      const databaseResponse: ChangeMovieStatusDatabaseResponseDto = await this.repository.changeMovieStatus(
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
      const Movie: ChangeMovieStatusDatabaseResponseDto = {
        id: databaseResponse.id,  
        name: databaseResponse.name!,
        status: databaseResponse.status!,
        success: databaseResponse.success,
        message: databaseResponse.message!
      };

      return {
        success: true,
        data: Movie
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Error interno del servidor'
      };
    }
  }
}