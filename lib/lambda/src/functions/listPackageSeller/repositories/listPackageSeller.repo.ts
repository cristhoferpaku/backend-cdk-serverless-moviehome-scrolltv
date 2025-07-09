import dbConnector from '../../../../layers/pg/nodejs/dbConnector';
import { ListPackageSellerDbResult } from '../dtos/listPackageSeller.dto';

export class ListPackageSellerRepository {

  /**
   * Lista paquetes vendedor con paginación y búsqueda por nombre usando el stored procedure
   */
  async listPackageSeller(
    searchName?: string,
    page: number = 1,
    pageSize: number = 10
  ): Promise<ListPackageSellerDbResult[]> {
    const query = 'SELECT * FROM sp_list_package_sellers($1, $2, $3)';
    const params = [
      searchName || null,
      page,
      pageSize
    ];
    
    const result = await dbConnector.query(query, params);
    
    if (result.rows.length === 0) {
      return [];
    }

    return result.rows as ListPackageSellerDbResult[];
  }
} 