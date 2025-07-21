import dbConnector from '../../../../layers/pg/nodejs/dbConnector';
import { Sections } from '../dtos/getAllSections.dto';

export class GetSectionsRepository {
  
  /**
   * Obtiene todos los Sections disponibles usando stored procedure
   */
  async getAllSections(): Promise<Sections[]> {
    const query = `
      SELECT * FROM sp_get_all_sections()
    `;
    
    const result = await dbConnector.query(query);
    return result.rows as Sections[];
  }
} 