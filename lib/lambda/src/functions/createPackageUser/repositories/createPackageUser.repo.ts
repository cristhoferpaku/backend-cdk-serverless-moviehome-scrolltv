import dbConnector from '../../../../layers/pg/nodejs/dbConnector';
import { CreatePackageUserDbResult, CreatePackageUserRequest } from '../dtos/createPackageUser.dto';

/**
 * Repository para crear paquetes de usuario
 */
export class CreatePackageUserRepository {

  /**
   * Crear un nuevo paquete de usuario usando stored procedure
   */
  async createPackageUser(packageUserData: CreatePackageUserRequest): Promise<CreatePackageUserDbResult> {
    const query = 'SELECT * FROM sp_create_package_user($1, $2, $3, $4, $5, $6, $7)';
    
    const values = [
      packageUserData.name,
      packageUserData.package_type_id,
      packageUserData.platform_id,
      packageUserData.duration_value,
      packageUserData.duration_type,
      packageUserData.max_devices || 1,
      packageUserData.discount_credits !== undefined ? packageUserData.discount_credits : true
    ];
    
    const result = await dbConnector.query(query, values);
    
    if (result.rows.length === 0) {
      throw new Error('No se recibió respuesta del stored procedure');
    }
    
    return result.rows[0] as CreatePackageUserDbResult;
  }
} 