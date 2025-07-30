import dbConnector from '../../../../layers/pg/nodejs/dbConnector';
import {
  UpdateSeasonDbResult,
  UpdateSeasonRequest
} from '../dtos/updateSeason.dto';

export class UpdateSeasonRepository {
  async updateSeason(id: number, data: UpdateSeasonRequest): Promise<UpdateSeasonDbResult> {

    const query = `
      SELECT * FROM sp_update_season($1, $2, $3 ,$4::INTEGER[])
    `;

    const values = [
      id,
      data.description ?? null,
      data.cover_image   ?? null,
      data.cast_ids    ?? []     
    ];

    const result = await dbConnector.query(query, values);

    if (result.rows.length === 0) {
      throw new Error('No se recibió respuesta del procedimiento almacenado');
    }
    
  return result.rows[0] as UpdateSeasonDbResult;
  }
}
