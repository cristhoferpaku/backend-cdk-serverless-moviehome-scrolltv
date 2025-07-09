import dbConnector from '../../../../layers/pg/nodejs/dbConnector';
import { Platform } from '../dtos/getPlatforms.dto';

export class GetPlatformsRepository {
  
  /**
   * Obtiene todas las plataformas disponibles usando stored procedure
   */
  async getAllPlatforms(): Promise<Platform[]> {
    const query = `
      SELECT * FROM sp_get_all_platforms()
    `;
    
    const result = await dbConnector.query(query);
    return result.rows as Platform[];
  }
} 