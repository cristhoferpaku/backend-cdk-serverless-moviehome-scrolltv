import dbConnector from '../../../../layers/pg/nodejs/dbConnector';
import { UpdatePackageUserRequest, UpdatePackageUserResponse } from '../dtos/updatePackageUser.dto';

/**
 * Repositorio para operaciones de actualización de paquetes de usuario
 */
export class UpdatePackageUserRepository {
  /**
   * Actualiza un paquete de usuario por ID
   */
  async updatePackageUser(
    id: number,
    updateData: UpdatePackageUserRequest
  ): Promise<UpdatePackageUserResponse> {
    try {
      // Ejecutar el stored procedure
      const query = `
        SELECT * FROM sp_update_package_user($1, $2, $3, $4, $5, $6, $7, $8, $9)
      `;
      
      const result = await dbConnector.query(query, [
        id,
        updateData.name || null,
        updateData.package_type_id || null,
        updateData.max_devices || null,
        updateData.platform_id || null,
        updateData.duration_value || null,
        updateData.duration_type || null,
        updateData.discount_credits !== undefined ? updateData.discount_credits : null,
        updateData.status || null
      ]);

      if (result.rows.length === 0) {
        throw new Error('No se pudo actualizar el paquete de usuario');
      }

      const row = result.rows[0];

      // Verificar si la operación fue exitosa
      if (!row.success) {
        throw new Error(row.message || 'Error al actualizar el paquete de usuario');
      }

      const response: UpdatePackageUserResponse = {
        id: row.id,
        name: row.name,
        package_type_id: row.package_type_id,
        package_type_name: row.package_type_name,
        max_devices: row.max_devices,
        platform_id: row.platform_id,
        platform_name: row.platform_name,
        duration_value: row.duration_value,
        duration_type: row.duration_type,
        discount_credits: row.discount_credits,
        status: row.status,
        created_at: row.created_at,
        updated_at: row.updated_at,
        success: row.success,
        message: row.message
      };

      return response;
    } catch (error) {
      console.error('Error en updatePackageUser:', error);
      throw error;
    }
  }
} 