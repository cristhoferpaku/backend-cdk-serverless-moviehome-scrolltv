import dbConnector from '../../../../layers/pg/nodejs/dbConnector';
import { GetPackageSellerByIdDbResult } from '../dtos/getPackageSellerById.dto';

export class GetPackageSellerByIdRepository {

  /**
   * Obtiene un paquete vendedor por ID usando el stored procedure
   */
  async getPackageSellerById(id: number): Promise<GetPackageSellerByIdDbResult> {
    const query = 'SELECT * FROM sp_get_package_seller_by_id($1)';
    const result = await dbConnector.query(query, [id]);
    
    if (result.rows.length === 0) {
      throw new Error('Error al ejecutar el procedimiento almacenado');
    }

    return result.rows[0] as GetPackageSellerByIdDbResult;
  }
} 