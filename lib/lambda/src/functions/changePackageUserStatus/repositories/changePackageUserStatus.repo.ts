import dbConnector from '../../../../layers/pg/nodejs/dbConnector';
import { ChangePackageUserStatusResponse } from '../dtos/changePackageUserStatus.dto';

/**
 * Repositorio para operaciones de cambio de status de paquetes de usuario
 */
export class ChangePackageUserStatusRepository {
  /**
   * Cambia el status de un paquete de usuario por ID
   */
  async changePackageUserStatus(
    id: number,
    status: number
  ): Promise<ChangePackageUserStatusResponse> {
    try {
      // Ejecutar el stored procedure
      const query = `
        SELECT * FROM sp_change_package_user_status($1, $2)
      `;
      
      const result = await dbConnector.query(query, [id, status]);

      if (result.rows.length === 0) {
        throw new Error('No se pudo cambiar el status del paquete de usuario');
      }

      const row = result.rows[0];

      // Verificar si la operación fue exitosa
      if (!row.success) {
        throw new Error(row.message || 'Error al cambiar el status del paquete de usuario');
      }

      const response: ChangePackageUserStatusResponse = {
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
      console.error('Error en changePackageUserStatus:', error);
      throw error;
    }
  }
} 