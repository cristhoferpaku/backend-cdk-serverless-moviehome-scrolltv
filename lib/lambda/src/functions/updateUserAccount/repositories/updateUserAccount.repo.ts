import dbConnector from '../../../../layers/pg/nodejs/dbConnector';
import {
  UpdateUserAccountDbResult,
  UpdateUserAccountRequest
} from '../dtos/updateUserAccount.dto';

export class UpdateUserAccountRepository {
  async updateUserAccount(id: number, data: UpdateUserAccountRequest): Promise<UpdateUserAccountDbResult> {
    const query = `
      SELECT * FROM sp_update_user_account($1, $2, $3, $4, $5, $6, $7)
    `;

    const values = [
      id,
      data.username || null,
      data.password || null,
      data.package_user_id || null,
      data.platform_id || null,
      data.user_admin_id || null,
      data.status ?? null
    ];

    const result = await dbConnector.query(query, values);

    if (result.rows.length === 0) {
      throw new Error('No se recibió respuesta del procedimiento almacenado');
    }

    return result.rows[0] as UpdateUserAccountDbResult;
  }
}
