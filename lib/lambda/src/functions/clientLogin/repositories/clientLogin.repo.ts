import dbConnector from '../../../../layers/pg/nodejs/dbConnector';
import { ClientUser } from '../dtos/clientLogin.dto';

export class ClientLoginRepository {
  
  /**
   * Busca un cliente por username
   * Por defecto asigna role_id = 4 y role_name = 'cliente'
   */
  async findByUsername(username: string): Promise<ClientUser | null> {
    const query = `
      SELECT 
        c.id,
        c.username,
        c.password,
        c.status,
        4 as role_id,
        'cliente' as role_name
      FROM user_account c
      WHERE c.username = $1
    `;
    
    const result = await dbConnector.query(query, [username]);
    if (result.rows.length === 0) {
      return null;
    }
    return result.rows[0] as ClientUser;
  }
  /**
   * Busca un cliente por email (alternativa de login)
   */

  /**
   * Actualiza la última fecha de login del cliente
   */
}