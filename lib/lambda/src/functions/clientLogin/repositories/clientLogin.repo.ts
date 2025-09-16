import dbConnector from '../../../../layers/pg/nodejs/dbConnector';
import { ClientUser, LoginDbResult, LoginRequest } from '../dtos/clientLogin.dto';

export class ClientLoginRepository {
  
  /**
   * Autentica un usuario usando el stored procedure sp_login_user
   */
  async loginUser(loginData: LoginRequest): Promise<LoginDbResult> {
    const query = 'SELECT * FROM sp_login_user($1, $2, $3, $4)';
    const values = [
      loginData.username,
      loginData.password,
      loginData.id_device,
      loginData.platform
    ];

    const result = await dbConnector.query(query, values);

    if (result.rows.length === 0) {
      throw new Error('No se recibió respuesta del stored procedure');
    }

    return result.rows[0] as LoginDbResult;
  }
  /**
   * Busca un cliente por email (alternativa de login)
   */

  /**
   * Actualiza la última fecha de login del cliente
   */
}