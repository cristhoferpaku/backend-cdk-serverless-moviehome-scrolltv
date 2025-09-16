import dbConnector from '../../../../layers/pg/nodejs/dbConnector';
import { LiveTv } from '../dtos/getAllLiveTv.dto';

export class GetLiveTvsRepository {
  
  /**
   * Obtiene todas las plataformas disponibles usando stored procedure
   */
  async getAllLiveTvs(): Promise<LiveTv[]> {
    const query = `
      SELECT * FROM sp_get_all_live_tv()
    `;
    
    const result = await dbConnector.query(query);
    return result.rows as LiveTv[];
  }
} 