import dbConnector from '../../../../layers/pg/nodejs/dbConnector';
import { HomeData, mapHomeData  } from '../dtos/getHomeData.dto';

export class GetHomeRepository {
  
  /**
   * Obtiene todos los Home disponibles usando stored procedure
   */
  async getAllHome(sectionId: number): Promise<HomeData> {
    const query = `
      SELECT * FROM sp_get_home_data($1);
    `;

   const { rows } = await dbConnector.query(query, [sectionId]);
   const raw = rows[0]?.sp_get_home_data; // ← nombre exacto de la columna
   const payload = typeof raw === 'string' ? JSON.parse(raw) : raw;
   return mapHomeData(payload ?? {});
  }
} 