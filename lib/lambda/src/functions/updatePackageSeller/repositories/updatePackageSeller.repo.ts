import dbConnector from '../../../../layers/pg/nodejs/dbConnector';
import { UpdatePackageSellerDbResult } from '../dtos/updatePackageSeller.dto';

export class UpdatePackageSellerRepository {

  /**
   * Actualiza un paquete vendedor usando el stored procedure con parámetros opcionales
   */
  async updatePackageSeller(
    id: number,
    name?: string,
    credit?: number,
    packageTypeId?: number,
    platformId?: number,
    status?: number
  ): Promise<UpdatePackageSellerDbResult> {
    const query = 'SELECT * FROM sp_update_package_seller($1, $2, $3, $4, $5, $6)';
    const params = [
      id,
      name || null,
      credit !== undefined ? credit : null,
      packageTypeId || null,
      platformId || null,
      status !== undefined ? status : null
    ];
    
    const result = await dbConnector.query(query, params);
    
    if (result.rows.length === 0) {
      throw new Error('Error al ejecutar el procedimiento almacenado');
    }

    return result.rows[0] as UpdatePackageSellerDbResult;
  }
} 