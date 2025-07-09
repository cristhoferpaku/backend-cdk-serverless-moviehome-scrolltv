import dbConnector from '../../../../layers/pg/nodejs/dbConnector';
import { CreatePackageTypeRequest, CreatePackageTypeDatabaseResponse } from '../dtos/createPackageType.dto';

export class CreatePackageTypeRepository {

  constructor() {
    // Constructor sin parámetros siguiendo el patrón de otros repositories
  }

  /**
   * Crea un nuevo tipo de paquete usando stored procedure
   */
  async createPackageType(name: string, status?: number): Promise<CreatePackageTypeDatabaseResponse> {
    const query = `
      SELECT * FROM sp_create_package_type($1, $2)
    `;
    
    const result = await dbConnector.query(query, [name, status || null]);
    
    if (result.rows.length === 0) {
      throw new Error('Error al ejecutar el procedimiento de creación de tipo de paquete');
    }
    
    return result.rows[0] as CreatePackageTypeDatabaseResponse;
  }
} 