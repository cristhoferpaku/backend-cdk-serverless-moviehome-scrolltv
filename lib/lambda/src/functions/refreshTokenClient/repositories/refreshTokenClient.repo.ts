import dbConnector from '../../../../layers/pg/nodejs/dbConnector';
import { ClientUser } from '../../clientLogin/dtos/clientLogin.dto';

export class RefreshTokenRepository {
  
  /**
   * Busca un usuario admin por ID
   */
  async findUserById(userId: number): Promise<ClientUser | null> {
    const query = `
      SELECT 
        ua.id,
        ua.username,
        ua.password,
        ua.status,
        5 as role_id,
        'cliente' as role_name
      FROM user_account ua
      WHERE ua.id = $1
    `;
    
    const result = await dbConnector.query(query, [userId]);
    
    if (result.rows.length === 0) {
      return null;
    }
    
    return result.rows[0] as ClientUser;
  }


} 