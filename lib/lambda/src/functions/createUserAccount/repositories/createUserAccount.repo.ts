import dbConnector from '../../../../layers/pg/nodejs/dbConnector';
import { CreateUserAccountDbResult, CreateUserAccountRequest } from '../dtos/createUserAccount.dto';

export class CreateUserAccountRepository {
  async createUserAccount(data: CreateUserAccountRequest): Promise<CreateUserAccountDbResult> {
    const query = 'SELECT * FROM sp_create_user_account($1, $2, $3, $4, $5)';
    const values = [
      data.username,
      data.password,
      data.package_user_id,
      data.platform_id,
      data.user_admin_id
    ];

    const result = await dbConnector.query(query, values);

    if (result.rows.length === 0) {
      throw new Error('No se recibió respuesta del stored procedure');
    }

    // El stored procedure ahora retorna directamente las columnas como tabla
    return result.rows[0] as CreateUserAccountDbResult;
  }
}
