import dbConnector from '../../../../layers/pg/nodejs/dbConnector';
import { PackageUserResponse } from '../dtos/listPackageUsers.dto';

/**
 * Repositorio para operaciones de listado de paquetes de usuario
 */
export class ListPackageUsersRepository {
  /**
   * Lista paquetes de usuario con paginación y búsqueda
   */
  async getPackageUsers(
    search?: string,
    page: number = 1,
    limit: number = 10
  ): Promise<{ items: PackageUserResponse[]; total: number }> {
    try {
      // Ejecutar el stored procedure
      const query = `
        SELECT * FROM sp_get_package_users($1, $2, $3)
      `;
      
      const result = await dbConnector.query(query, [
        search || null,
        page,
        limit
      ]);

      const items: PackageUserResponse[] = result.rows.map((row: any) => ({
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
        updated_at: row.updated_at
      }));

      // Obtener el total desde el primer registro (si existe)
      const total = result.rows.length > 0 ? parseInt(result.rows[0].total_count) : 0;

      return { items, total };
    } catch (error) {
      console.error('Error en getPackageUsers:', error);
      throw new Error('Error al obtener los paquetes de usuario');
    }
  }
} 