import dbConnector from '../../../../layers/pg/nodejs/dbConnector';
import { GetSeasonByIdDbResult } from '../dtos/getSeasonById.dto';

export class GetSeasonByIdRepository {
  async getSeasonById(id: number): Promise<GetSeasonByIdDbResult> {
    const query = 'SELECT * FROM sp_get_season_by_id($1)';
    const result = await dbConnector.query(query, [id]);

    if (result.rows.length === 0) {
      throw new Error('No se encontró la temporada o no hubo respuesta del procedimiento');
    }

    return result.rows[0] as GetSeasonByIdDbResult;
  }
}
