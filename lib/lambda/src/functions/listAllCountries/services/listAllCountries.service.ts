import { GetCountryRepository } from '../repositories/listAllCountries.repo';
import { GetCountryResponse } from '../dtos/listAllCountries.dto';
import { logInfo, logError } from '../../../../layers/utils/nodejs/utils';

export class GetCountryService {
  private repository: GetCountryRepository;
  private readonly serviceName = 'GetCountryService';

  constructor() {
    this.repository = new GetCountryRepository();
  }

  /**
   * Obtiene todos los Country disponibles
   */
  async getAllCountry(): Promise<GetCountryResponse> {
    try {
      logInfo(this.serviceName, 'Obteniendo todos los Country');

      const Country = await this.repository.getAllCountry();
      
      logInfo(this.serviceName, 'Country obtenidos exitosamente', { 
        total: Country.length 
      });

      const response: GetCountryResponse = {
        items: Country,
        message: `Se encontraron ${Country.length} rol(es) disponible(s)`
      };

      return response;

    } catch (error) {
      logError(this.serviceName, error instanceof Error ? error : 'Error desconocido');
      throw error;
    }
  }
} 