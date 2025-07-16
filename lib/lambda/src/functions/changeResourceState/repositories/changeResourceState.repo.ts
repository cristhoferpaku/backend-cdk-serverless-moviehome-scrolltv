import dbConnector from '../../../../layers/pg/nodejs/dbConnector';
import { ChangeResourceStateDatabaseResponseDto } from '../dtos/changeResourceState.dto';

export class ChangeResourceStateRepository {
  async changeResourceState(id: number, state: number): Promise<ChangeResourceStateDatabaseResponseDto> {
    const query = 'SELECT * FROM sp_change_resource_state($1, $2)';
    const result = await dbConnector.query(query, [id, state]);

    if (result.rows.length === 0) {
      throw new Error('No se pudo cambiar el estado del recurso o no hubo respuesta del procedimiento');
    }

    return result.rows[0] as ChangeResourceStateDatabaseResponseDto;
  }
}