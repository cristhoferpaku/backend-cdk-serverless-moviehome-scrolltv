import dbConnector from '../../../../layers/pg/nodejs/dbConnector';
import {
  UpdateEpisodeDbResult,
  UpdateEpisodeRequest
} from '../dtos/updateEpisode.dto';

export class UpdateEpisodeRepository {
  async updateEpisode(id: number, data: UpdateEpisodeRequest): Promise<UpdateEpisodeDbResult> {

    const query = `
      SELECT * FROM sp_update_episode($1, $2, $3 ,$4, $5)

    `;

    const values = [
      id,
      data.title || null,
      data.description || null,
      data.video_file || null,
      data.duration_mins || null,
    ];

    const result = await dbConnector.query(query, values);

    if (result.rows.length === 0) {
      throw new Error('No se recibió respuesta del procedimiento almacenado');
    }

    return result.rows[0] as UpdateEpisodeDbResult;
  }
}
