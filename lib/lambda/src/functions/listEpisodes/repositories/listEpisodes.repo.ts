import dbConnector from '../../../../layers/pg/nodejs/dbConnector';
import { SeasonRecord, ListSeasonParams } from '../dtos/listEpisodes.dto';

const FUNCTION_NAME = 'ListSeasonRepository';

export class ListSeasonRepository {
  async getSeason(params: ListSeasonParams): Promise<SeasonRecord[]> {
    try {
      const query = 'SELECT * FROM sp_list_episodes($1)';
      const result = await dbConnector.query(query, [
        params.season_id,
      ]);

      return result.rows.map((row: any) => ({
        id: row.id,
        episode_num: row.episode_num,
      }));
    } catch (error) {
      throw new Error('Error al obtener los episodios');
    }
  }
}
