import dbConnector from '../../../../layers/pg/nodejs/dbConnector';
import { UpdatePackageTypeDbResult } from '../dtos/updatePackageType.dto';

export class UpdatePackageTypeRepository {

  /**
   * Actualiza un tipo de paquete usando el stored procedure
   */
  async updatePackageType(id: number, name: string, status?: number): Promise<UpdatePackageTypeDbResult> {
    const query = 'SELECT * FROM sp_update_package_type($1, $2, $3)';
    const result = await dbConnector.query(query, [id, name, status || null ]);
    
    if (result.rows.length === 0) {
      throw new Error('Error al ejecutar el procedimiento de actualización de tipo de paquete');
    }
    
    return result.rows[0] as UpdatePackageTypeDbResult;
  }
} 