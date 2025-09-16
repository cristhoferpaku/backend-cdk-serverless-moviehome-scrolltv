import dbConnector from '../../../../layers/pg/nodejs/dbConnector';
import { GetEpisodesFromSeasonDbResult, GetEpisodesFromSeasonRequest } from '../dtos/getEpisodesFromSeason.dto';

export class GetEpisodesFromSeasonRepository {
  async getEpisodesFromSeason(data: GetEpisodesFromSeasonRequest): Promise<GetEpisodesFromSeasonDbResult[]> {
    const query = 'SELECT * FROM sp_get_episodes_from_season($1)';
    const result = await dbConnector.query(query, [data.season_id]);

    return result.rows as GetEpisodesFromSeasonDbResult[];
  }
}
