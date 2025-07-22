import dbConnector from '../../../../layers/pg/nodejs/dbConnector';
import { SeasonRecord, ListSeasonParams } from '../dtos/listSeasons.dto';

const FUNCTION_NAME = 'ListSeasonRepository';

export class ListSeasonRepository {
  async getSeason(params: ListSeasonParams): Promise<SeasonRecord[]> {
    try {
      const query = 'SELECT * FROM sp_list_seasons($1)';
      const result = await dbConnector.query(query, [
        params.serie_id,
      ]);

      return result.rows.map((row: any) => ({
        id: row.id,
        season_num: row.season_num,
      }));
    } catch (error) {
      throw new Error('Error al obtener las temporadas');
    }
  }
}
