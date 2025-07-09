import dbConnector from '../../../../layers/pg/nodejs/dbConnector';
import { GetPackageUserByIdDbResult } from '../dtos/getPackageUserById.dto';

/**
 * Repository para obtener paquetes de usuario por ID
 */
export class GetPackageUserByIdRepository {

  /**
   * Obtener un paquete de usuario por ID usando stored procedure
   */
  async getPackageUserById(id: number): Promise<GetPackageUserByIdDbResult> {
    const query = 'SELECT * FROM sp_get_package_user_by_id($1)';
    const result = await dbConnector.query(query, [id]);
    
    if (result.rows.length === 0) {
      throw new Error('No se recibió respuesta del stored procedure');
    }
    
    return result.rows[0] as GetPackageUserByIdDbResult;
  }
} 