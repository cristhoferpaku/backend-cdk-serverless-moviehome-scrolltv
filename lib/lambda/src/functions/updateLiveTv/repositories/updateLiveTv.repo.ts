import dbConnector from '../../../../layers/pg/nodejs/dbConnector';
import {
  UpdateLiveTvDbResult,
  UpdateLiveTvRequest
} from '../dtos/updateLiveTv.dto';

export class UpdateLiveTvRepository {
  async updateLiveTv(id: number, data: UpdateLiveTvRequest): Promise<UpdateLiveTvDbResult> {
    const query = `
      SELECT * FROM sp_update_live_tv($1, $2, $3)
    `;

    const values = [
      id,
      data.name || null, 
      data.url || null
    ];

    const result = await dbConnector.query(query, values);

    if (result.rows.length === 0) {
      throw new Error('No se recibió respuesta del procedimiento almacenado');
    }

    return result.rows[0] as UpdateLiveTvDbResult;
  }
}
