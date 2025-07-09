import dbConnector from '../../../../layers/pg/nodejs/dbConnector';
import { GetPackageTypeByIdDatabaseResponse } from '../dtos/getPackageTypeById.dto';

export class GetPackageTypeByIdRepository {

  constructor() {
    // Constructor sin parámetros siguiendo el patrón de otros repositories
  }

  /**
   * Obtiene un tipo de paquete por ID usando stored procedure
   */
  async getPackageTypeById(id: number): Promise<GetPackageTypeByIdDatabaseResponse> {
    const query = `
      SELECT * FROM sp_get_package_type_by_id($1)
    `;
    
    const result = await dbConnector.query(query, [id]);
    
    if (result.rows.length === 0) {
      throw new Error('Error al ejecutar el procedimiento de búsqueda de tipo de paquete');
    }
    
    return result.rows[0] as GetPackageTypeByIdDatabaseResponse;
  }
} 