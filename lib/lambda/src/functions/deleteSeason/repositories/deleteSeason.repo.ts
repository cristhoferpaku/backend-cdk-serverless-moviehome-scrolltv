import dbConnector from '../../../../layers/pg/nodejs/dbConnector';
import { DeleteSerieDbResult } from '../dtos/deleteSeason.dto';

export class DeleteSerieRepository {
  async deleteSerie(id: number): Promise<DeleteSerieDbResult> {
    const query = 'SELECT * FROM sp_delete_season($1)';
    const result = await dbConnector.query(query, [id]);

    if (result.rows.length === 0) {
      throw new Error('No se recibió respuesta del procedimiento almacenado');
    }

    return result.rows[0] as DeleteSerieDbResult;
  }
}
