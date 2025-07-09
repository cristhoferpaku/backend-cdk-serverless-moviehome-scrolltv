import dbConnector from '../../../../layers/pg/nodejs/dbConnector';
import { ListPackageTypesRequest, ListPackageTypesDatabaseResponse } from '../dtos/listPackageTypes.dto';

export class ListPackageTypesRepository {

  constructor() {
    // Constructor sin parámetros siguiendo el patrón de otros repositories
  }

  /**
   * Lista tipos de paquetes con paginación y búsqueda usando stored procedure
   */
  async listPackageTypes(
    searchName?: string, 
    page: number = 1, 
    pageSize: number = 10
  ): Promise<ListPackageTypesDatabaseResponse[]> {
    const query = `
      SELECT * FROM sp_list_package_types($1, $2, $3)
    `;
    
    const values = [
      searchName || null,
      page,
      pageSize
    ];

    const result = await dbConnector.query(query, values);
    
    return result.rows as ListPackageTypesDatabaseResponse[];
  }
} 