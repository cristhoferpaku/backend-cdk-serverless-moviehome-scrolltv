import dbConnector from '../../../../layers/pg/nodejs/dbConnector';
import { Collections } from '../dtos/getAllCollections.dto';

export class GetCollectionsRepository {
  
  /**
   * Obtiene todos los Collections disponibles usando stored procedure
   */
  async getAllCollections(): Promise<Collections[]> {
    const query = `
      SELECT * FROM sp_get_all_collections()
    `;
    
    const result = await dbConnector.query(query);
    return result.rows as Collections[];
  }
} 