import { GetMultimediaCategoriesRepository } from '../repositories/getAllMultimediaCategories.repo';
import { GetMultimediaCategoriesResponse } from '../dtos/getAllMultimediaCategories.dto';
import { logInfo, logError } from '../../../../layers/utils/nodejs/utils';

export class GetMultimediaCategoriesService {
  private repository: GetMultimediaCategoriesRepository;
  private readonly serviceName = 'GetMultimediaCategoriesService';

  constructor() {
    this.repository = new GetMultimediaCategoriesRepository();
  }

  /**
   * Obtiene todos los MultimediaCategories disponibles
   */
  async getAllMultimediaCategories(): Promise<GetMultimediaCategoriesResponse> {
    try {
      logInfo(this.serviceName, 'Obteniendo todas las categorias');  

      const MultimediaCategories = await this.repository.getAllMultimediaCategories();
      
      logInfo(this.serviceName, 'MultimediaCategories obtenidos exitosamente', { 
        total: MultimediaCategories.length 
      });

      const response: GetMultimediaCategoriesResponse = {
        items: MultimediaCategories,
        message: `Se encontraron ${MultimediaCategories.length} categoría(s) disponible(s)`
      };

      return response;

    } catch (error) {
      logError(this.serviceName, error instanceof Error ? error : 'Error desconocido');
      throw error;
    }
  }
} 