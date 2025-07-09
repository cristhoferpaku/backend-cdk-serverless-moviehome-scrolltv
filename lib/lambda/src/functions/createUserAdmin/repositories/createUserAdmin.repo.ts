import dbConnector from '../../../../layers/pg/nodejs/dbConnector';
import { StoredProcedureResult } from '../dtos/createUserAdmin.dto';

export class CreateUserAdminRepository {
  
  /**
   * Crea un nuevo usuario admin usando stored procedure
   */
  async createUserAdmin(
    username: string, 
    hashedPassword: string, 
    roleId: number, 
    status: number = 1,
    phone?: string,
    platformId?: number
  ): Promise<StoredProcedureResult> {
    const query = `
      SELECT * FROM sp_create_user_admin($1, $2, $3, $4, $5, $6)
    `;
    
    const result = await dbConnector.query(query, [
      username, 
      hashedPassword, 
      roleId, 
      status, 
      phone, 
      platformId
    ]);
    
    if (result.rows.length === 0) {
      throw new Error('Error al ejecutar el procedimiento de creación de usuario');
    }
    
    return result.rows[0] as StoredProcedureResult;
  }


} 