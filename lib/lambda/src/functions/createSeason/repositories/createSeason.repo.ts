import dbConnector from '../../../../layers/pg/nodejs/dbConnector';
import { CreateSeasonDbResult, CreateSeasonRequest } from '../dtos/createSeason.dto';

export class CreateSeasonRepository {
  async createSeason(data: CreateSeasonRequest): Promise<CreateSeasonDbResult> {
    const query = 'SELECT * FROM sp_create_season($1, $2 ,$3 ,$4)';


    const values = [
      data.series_id,
      data.description,
      data.cover_image,
      data.cast_ids,
    ];

    const result = await dbConnector.query(query, values);

    if (result.rows.length === 0) {
      throw new Error('No se recibió respuesta del stored procedure');
    }

    return result.rows[0] as CreateSeasonDbResult;
  }
}
