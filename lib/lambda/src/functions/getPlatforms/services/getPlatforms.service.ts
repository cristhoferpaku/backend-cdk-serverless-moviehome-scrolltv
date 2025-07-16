import { GetPlatformsRepository } from '../repositories/getPlatforms.repo';
import { GetPlatformsResponse } from '../dtos/getPlatforms.dto';

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
      const platforms = await this.repository.getAllPlatforms();
      const response: GetPlatformsResponse = {
        items: platforms,
        total: platforms.length,
        message: `Se encontraron ${platforms.length} plataforma(s) disponible(s)`
      };
      return response;

    } catch (error) {
      throw error;
    }
  }
} 