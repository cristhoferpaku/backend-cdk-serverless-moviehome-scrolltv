import { GetPlatformsRepository } from '../repositories/getPlatforms.repo';
import { GetPlatformsResponse } from '../dtos/getPlatforms.dto';
import { logInfo, logError } from '../../../../layers/utils/nodejs/utils';

export class GetPlatformsService {
  private repository: GetPlatformsRepository;
  private readonly serviceName = 'GetPlatformsService';

  constructor() {
    this.repository = new GetPlatformsRepository();
  }

  /**
   * Obtiene todas las plataformas disponibles
   */
  async getAllPlatforms(): Promise<GetPlatformsResponse> {
    try {
      logInfo(this.serviceName, 'Obteniendo todas las plataformas');

      const platforms = await this.repository.getAllPlatforms();
      
      logInfo(this.serviceName, 'Plataformas obtenidas exitosamente', { 
        total: platforms.length 
      });

      const response: GetPlatformsResponse = {
        items: platforms,
        total: platforms.length,
        message: `Se encontraron ${platforms.length} plataforma(s) disponible(s)`
      };

      return response;

    } catch (error) {
      logError(this.serviceName, error instanceof Error ? error : 'Error desconocido');
      throw error;
    }
  }
} 