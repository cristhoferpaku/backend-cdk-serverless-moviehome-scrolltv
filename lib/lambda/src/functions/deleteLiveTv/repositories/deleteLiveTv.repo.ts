import dbConnector from '../../../../layers/pg/nodejs/dbConnector';
import { DeleteLiveTvDbResult } from '../dtos/deleteLiveTv.dto';

export class DeleteLiveTvRepository {
  async deleteLiveTv(id: number): Promise<DeleteLiveTvDbResult> {
    const query = 'SELECT * FROM sp_delete_live_tv($1)';
    const result = await dbConnector.query(query, [id]);

    if (result.rows.length === 0) {
      throw new Error('No se recibió respuesta del procedimiento almacenado');
    }

    return result.rows[0] as DeleteLiveTvDbResult;
  }
}
