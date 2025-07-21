import dbConnector from '../../../../layers/pg/nodejs/dbConnector';
import { DeleteMovieDbResult } from '../dtos/deleteMovie.dto';

export class DeleteMovieRepository {
  async deleteMovie(id: number): Promise<DeleteMovieDbResult> {
    const query = 'SELECT * FROM sp_delete_movie($1)';
    const result = await dbConnector.query(query, [id]);

    if (result.rows.length === 0) {
      throw new Error('No se recibió respuesta del procedimiento almacenado');
    }

    return result.rows[0] as DeleteMovieDbResult;
  }
}
