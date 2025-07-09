import dbConnector from '../../../../layers/pg/nodejs/dbConnector';
import { DeletePackageSellerDbResult } from '../dtos/deletePackageSeller.dto';

export class DeletePackageSellerRepository {

  /**
   * Elimina un paquete vendedor por ID usando el stored procedure
   */
  async deletePackageSeller(id: number): Promise<DeletePackageSellerDbResult> {
    const query = 'SELECT * FROM sp_delete_package_seller($1)';
    const result = await dbConnector.query(query, [id]);
    
    if (result.rows.length === 0) {
      throw new Error('Error al ejecutar el procedimiento almacenado');
    }

    return result.rows[0] as DeletePackageSellerDbResult;
  }
} 