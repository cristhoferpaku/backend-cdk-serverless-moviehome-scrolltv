import dbConnector from '../../../../layers/pg/nodejs/dbConnector';
import { LogoutMobileDbResult, LogoutMobileRequest } from '../dtos/logoutMobile.dto';

export class LogoutMobileRepository {
  async logoutUser(data: LogoutMobileRequest): Promise<LogoutMobileDbResult> {
    const query = 'SELECT * FROM sp_logout_user($1)';
    const values = [data.id_device];

    const result = await dbConnector.query(query, values);

    if (result.rows.length === 0) {
      throw new Error('No se recibió respuesta del stored procedure');
    }

    return result.rows[0] as LogoutMobileDbResult;
  }
}
