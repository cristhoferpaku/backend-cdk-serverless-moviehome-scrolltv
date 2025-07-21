import dbConnector from '../../../../layers/pg/nodejs/dbConnector';
import { MultimediaCategories } from '../dtos/getAllMultimediaCategories.dto';

export class GetMultimediaCategoriesRepository {
  
  /**
   * Obtiene todos los MultimediaCategories disponibles usando stored procedure
   */
  async getAllMultimediaCategories(): Promise<MultimediaCategories[]> {
    const query = `
      SELECT * FROM sp_get_all_multimedia_categories()
    `;
    
    const result = await dbConnector.query(query);
    return result.rows as MultimediaCategories[];
  }
} 