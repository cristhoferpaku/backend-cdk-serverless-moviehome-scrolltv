import dbConnector from '../../../../layers/pg/nodejs/dbConnector';
import { ChangeMovieStatusDatabaseResponseDto } from '../dtos/changeMovieStatus.dto';

export class ChangeMovieStatusRepository {
  async changeMovieStatus(id: number, status: number): Promise<ChangeMovieStatusDatabaseResponseDto> {
    const query = 'SELECT * FROM sp_change_movie_status($1, $2)';
    const result = await dbConnector.query(query, [id, status]);

    if (result.rows.length === 0) {
      throw new Error('No se pudo cambiar el estado de la película o no hubo respuesta del procedimiento');
    }

    return result.rows[0] as ChangeMovieStatusDatabaseResponseDto;
  }
}