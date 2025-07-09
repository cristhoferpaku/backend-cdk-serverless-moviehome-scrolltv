import dbConnector from '../../../../layers/pg/nodejs/dbConnector';
import { DeletePackageTypeDatabaseResponse } from '../dtos/deletePackageType.dto';

export class DeletePackageTypeRepository {

  constructor() {
    // Constructor sin parámetros siguiendo el patrón de otros repositories
  }

  /**
   * Elimina un tipo de paquete por ID usando stored procedure
   */
  async deletePackageType(id: number): Promise<DeletePackageTypeDatabaseResponse> {
    const query = `
      SELECT * FROM sp_delete_package_type($1)
    `;
    
    const result = await dbConnector.query(query, [id]);
    
    if (result.rows.length === 0) {
      throw new Error('Error al ejecutar el procedimiento de eliminación de tipo de paquete');
    }
    
    return result.rows[0] as DeletePackageTypeDatabaseResponse;
  }
} 