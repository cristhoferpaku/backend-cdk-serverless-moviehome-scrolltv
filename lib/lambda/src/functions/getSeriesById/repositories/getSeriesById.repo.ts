import dbConnector from '../../../../layers/pg/nodejs/dbConnector';
import { GetSerieByIdDbResult } from '../dtos/getSeriesById.dto';

export class GetSerieByIdRepository {
  async getSerieById(id: number): Promise<GetSerieByIdDbResult> {
    const query = 'SELECT * FROM sp_get_serie_by_id($1)';
    const result = await dbConnector.query(query, [id]);

    if (result.rows.length === 0) {
      throw new Error('No se encontró la serie o no hubo respuesta del procedimiento');
    }

    return result.rows[0] as GetSerieByIdDbResult;
  }
}
