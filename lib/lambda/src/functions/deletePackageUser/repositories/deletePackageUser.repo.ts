import dbConnector from '../../../../layers/pg/nodejs/dbConnector';
import { DeletePackageUserResponse } from '../dtos/deletePackageUser.dto';

/**
 * Repositorio para operaciones de eliminación de paquetes de usuario
 */
export class DeletePackageUserRepository {
  /**
   * Elimina un paquete de usuario por ID
   */
  async deletePackageUser(id: number): Promise<DeletePackageUserResponse> {
    try {
      // Ejecutar el stored procedure
      const query = `
        SELECT * FROM sp_delete_package_user($1)
      `;
      
      const result = await dbConnector.query(query, [id]);

      if (result.rows.length === 0) {
        throw new Error('No se pudo eliminar el paquete de usuario');
      }

      const row = result.rows[0];

      const response: DeletePackageUserResponse = {
        success: row.success,
        message: row.message
      };

      // Si no fue exitoso, lanzar error con el mensaje del SP
      if (!response.success) {
        throw new Error(response.message);
      }

      return response;
    } catch (error) {
      console.error('Error en deletePackageUser:', error);
      throw error;
    }
  }
} 