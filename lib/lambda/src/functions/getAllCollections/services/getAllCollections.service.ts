import { GetCollectionsRepository } from '../repositories/getAllCollections.repo';
import { GetCollectionsResponse } from '../dtos/getAllCollections.dto';
import { logInfo, logError } from '../../../../layers/utils/nodejs/utils';

export class GetCollectionsService {
  private repository: GetCollectionsRepository;
  private readonly serviceName = 'GetCollectionsService';

  constructor() {
    this.repository = new GetCollectionsRepository();
  }

  /**
   * Obtiene todos los Collections disponibles
   */
  async getAllCollections(): Promise<GetCollectionsResponse> {
    try {
      logInfo(this.serviceName, 'Obteniendo todas las Colecciones');

      const Collections = await this.repository.getAllCollections();
      
      logInfo(this.serviceName, 'Collections obtenidos exitosamente', { 
        total: Collections.length 
      });

      const response: GetCollectionsResponse = {
        items: Collections,
        message: `Se encontraron ${Collections.length} colección(es) disponible(s)`
      };

      return response;

    } catch (error) {
      logError(this.serviceName, error instanceof Error ? error : 'Error desconocido');
      throw error;
    }
  }
} 