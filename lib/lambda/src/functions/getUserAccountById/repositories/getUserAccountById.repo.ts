import dbConnector from '../../../../layers/pg/nodejs/dbConnector';
import { GetUserAccountByIdDbResult } from '../dtos/getUserAccountById.dto';

export class GetUserAccountByIdRepository {
  async getUserAccountById(id: number): Promise<GetUserAccountByIdDbResult> {
    const query = 'SELECT * FROM sp_get_user_account_by_id($1)';
    const result = await dbConnector.query(query, [id]);

    if (result.rows.length === 0) {
      throw new Error('No se encontró el usuario o no hubo respuesta del procedimiento');
    }

    return result.rows[0] as GetUserAccountByIdDbResult;
  }
}
