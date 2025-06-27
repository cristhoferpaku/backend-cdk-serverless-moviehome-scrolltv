import dbConnector from '../../../../layers/pg/nodejs/dbConnector';
import { AdminUser } from '../dtos/adminLogin.dto';

export class AdminLoginRepository {
  
  /**
   * Busca un usuario admin por username
   */
  async findByUsername(username: string): Promise<AdminUser | null> {
    const query = `
      SELECT 
        ua.id,
        ua.username,
        ua.password,
        ua.status,
        ua.role_id,
        r.name as role_name
      FROM user_admin ua
      INNER JOIN role r ON ua.role_id = r.id
      WHERE ua.username = $1
    `;
    
    const result = await dbConnector.query(query, [username]);
    
    if (result.rows.length === 0) {
      return null;
    }
    
    return result.rows[0] as AdminUser;
  }

  /**
   * Actualiza la última fecha de login del usuario
   */
  async updateLastLogin(userId: number): Promise<void> {
    const query = `
      UPDATE user_admin 
      SET updated_at = CURRENT_TIMESTAMP 
      WHERE id = $1
    `;
    
    await dbConnector.query(query, [userId]);
  }
} 