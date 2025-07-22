import dbConnector from '../../../../layers/pg/nodejs/dbConnector';
import { ChangeSerieStatusDatabaseResponseDto } from '../dtos/changeSeriesStatus.dto';

export class ChangeSerieStatusRepository {
  async changeSerieStatus(id: number, status: number): Promise<ChangeSerieStatusDatabaseResponseDto> {
    const query = 'SELECT * FROM sp_change_serie_status($1, $2)';
    const result = await dbConnector.query(query, [id, status]);

    if (result.rows.length === 0) {
      throw new Error('No se pudo cambiar el estado de la serie o no hubo respuesta del procedimiento');
    }

    return result.rows[0] as ChangeSerieStatusDatabaseResponseDto;
  }
}