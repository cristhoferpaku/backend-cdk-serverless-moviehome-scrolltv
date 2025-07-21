import { GetSectionsRepository } from '../repositories/getAllSections.repo';
import { GetSectionsResponse } from '../dtos/getAllSections.dto';
import { logInfo, logError } from '../../../../layers/utils/nodejs/utils';

export class GetSectionsService {
  private repository: GetSectionsRepository;
  private readonly serviceName = 'GetSectionsService';

  constructor() {
    this.repository = new GetSectionsRepository();
  }

  /**
   * Obtiene todos los Sections disponibles
   */
  async getAllSections(): Promise<GetSectionsResponse> {
    try {
      logInfo(this.serviceName, 'Obteniendo todos los Apartados');

      const Sections = await this.repository.getAllSections();
      
      logInfo(this.serviceName, 'Sections obtenidos exitosamente', { 
        total: Sections.length 
      });

      const response: GetSectionsResponse = {
        items: Sections,
        message: `Se encontraron ${Sections.length} apartados disponible(s)`
      };

      return response;

    } catch (error) {
      logError(this.serviceName, error instanceof Error ? error : 'Error desconocido');
      throw error;
    }
  }
} 