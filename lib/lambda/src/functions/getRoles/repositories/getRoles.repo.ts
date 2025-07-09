import dbConnector from '../../../../layers/pg/nodejs/dbConnector';
import { Role } from '../dtos/getRoles.dto';

export class GetRolesRepository {
  
  /**
   * Obtiene todos los roles disponibles usando stored procedure
   */
  async getAllRoles(): Promise<Role[]> {
    const query = `
      SELECT * FROM sp_get_all_roles()
    `;
    
    const result = await dbConnector.query(query);
    return result.rows as Role[];
  }
} 