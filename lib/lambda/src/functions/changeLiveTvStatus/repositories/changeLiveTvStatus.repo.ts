import dbConnector from '../../../../layers/pg/nodejs/dbConnector';
import { ChangeLiveTvStateDatabaseResponseDto } from '../dtos/changeLiveTvStatus.dto';

export class ChangeLiveTvStateRepository {
  async changeLiveTvState(id: number, status: number): Promise<ChangeLiveTvStateDatabaseResponseDto> {
    const query = 'SELECT * FROM sp_change_live_tv_status($1, $2)';
    const result = await dbConnector.query(query, [id, status]);

    if (result.rows.length === 0) {
      throw new Error('No se pudo cambiar el estado de la categoria del canal de TV en vivo o no hubo respuesta del procedimiento');
    }

    return result.rows[0] as ChangeLiveTvStateDatabaseResponseDto;
  }
}