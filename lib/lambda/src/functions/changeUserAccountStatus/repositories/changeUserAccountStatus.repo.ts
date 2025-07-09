import dbConnector from '../../../../layers/pg/nodejs/dbConnector';
import {
  ChangeUserAccountStatusDbResult
} from '../dtos/changeUserAccountStatus.dto';

export class ChangeUserAccountStatusRepository {
  async changeStatus(userId: number, status: number): Promise<ChangeUserAccountStatusDbResult> {
    const query = 'SELECT * FROM sp_change_user_account_status($1, $2)';
    const result = await dbConnector.query(query, [userId, status]);

    if (result.rows.length === 0) {
      throw new Error('No se recibió respuesta del procedimiento almacenado');
    }

    return result.rows[0] as ChangeUserAccountStatusDbResult;
  }
}
