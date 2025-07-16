import dbConnector from '../../../../layers/pg/nodejs/dbConnector';
import { Country } from '../dtos/listAllCountries.dto';

export class GetCountryRepository {
  
  /**
   * Obtiene todos los Countrys disponibles usando stored procedure
   */
  async getAllCountry(): Promise<Country[]> {
    const query = `
      SELECT * FROM sp_get_all_countries()
    `;
    
    const result = await dbConnector.query(query);
    return result.rows as Country[];
  }
} 