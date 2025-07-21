import dbConnector from '../../../../layers/pg/nodejs/dbConnector';
import { GetMovieByIdDbResult } from '../dtos/getMovieById.dto';

export class GetMovieByIdRepository {
  async getMovieById(id: number): Promise<GetMovieByIdDbResult> {
    const query = 'SELECT * FROM sp_get_movie_by_id($1)';
    const result = await dbConnector.query(query, [id]);

    if (result.rows.length === 0) {
      throw new Error('No se encontró la película o no hubo respuesta del procedimiento');
    }

    return result.rows[0] as GetMovieByIdDbResult;
  }
}
