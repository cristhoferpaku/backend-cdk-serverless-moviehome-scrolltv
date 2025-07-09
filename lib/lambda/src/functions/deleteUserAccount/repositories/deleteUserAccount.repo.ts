import dbConnector from '../../../../layers/pg/nodejs/dbConnector';
import { DeleteUserAccountDbResult } from '../dtos/deleteUserAccount.dto';

export class DeleteUserAccountRepository {
  async deleteUserAccount(id: number): Promise<DeleteUserAccountDbResult> {
    const query = 'SELECT * FROM sp_delete_user_account($1)';
    const result = await dbConnector.query(query, [id]);

    if (result.rows.length === 0) {
      throw new Error('No se recibió respuesta del procedimiento almacenado');
    }

    return result.rows[0] as DeleteUserAccountDbResult;
  }
}
