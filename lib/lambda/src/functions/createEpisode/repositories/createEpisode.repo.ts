import dbConnector from '../../../../layers/pg/nodejs/dbConnector';
import { CreateEpisodeDbResult, CreateEpisodeRequest } from '../dtos/createEpisode.dto';

export class CreateEpisodeRepository {
  async createEpisode(data: CreateEpisodeRequest): Promise<CreateEpisodeDbResult> {
    const query = 'SELECT * FROM sp_create_episode($1, $2 ,$3 ,$4, $5)';


    const values = [
      data.season_id,
      data.title,
      data.duration_mins,
      data.description,
      data.video_file,
    ];

    const result = await dbConnector.query(query, values);

    if (result.rows.length === 0) {
      throw new Error('No se recibió respuesta del stored procedure');
    }

    return result.rows[0] as CreateEpisodeDbResult;
  }
}
