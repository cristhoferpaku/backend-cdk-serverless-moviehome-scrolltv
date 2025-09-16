import dbConnector from '../../../../layers/pg/nodejs/dbConnector';
import { GetLiveTvByIdDbResult } from '../dtos/getLiveTvById.dto';

const FUNCTION_NAME = 'GetLiveTvByIdRepository';

export class GetLiveTvByIdRepository {
  async getLiveTvById(id: number): Promise<GetLiveTvByIdDbResult> {
    try {
      const query = 'SELECT * FROM sp_get_live_tv_by_id($1)';
      const result = await dbConnector.query(query, [id]);

      if (result.rows.length === 0) {
        throw new Error('No se encontró el canal de TV en vivo o no hubo respuesta del procedimiento');
      }

      return result.rows[0] as GetLiveTvByIdDbResult;
    } catch (error) {
      console.error(`[${FUNCTION_NAME}] Error al obtener canal de TV en vivo por ID:`, error);
      throw error;
    }
  }
}