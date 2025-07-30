import dbConnector from '../../../../layers/pg/nodejs/dbConnector';
import { DeleteEpisodeDbResult } from '../dtos/deleteEpisode.dto';

export class DeleteEpisodeRepository {
  async deleteEpisode(id: number): Promise<DeleteEpisodeDbResult> {
    const query = 'SELECT * FROM sp_delete_episode($1)';
    const result = await dbConnector.query(query, [id]);

    if (result.rows.length === 0) {
      throw new Error('No se recibió respuesta del procedimiento almacenado');
    }

    return result.rows[0] as DeleteEpisodeDbResult;
  }
}
