import dbConnector from '../../../../layers/pg/nodejs/dbConnector';
import { logError, logInfo } from '../../../../layers/utils/nodejs/utils';
import { UserAdminRecord, ListUserAdminsParams } from '../dtos/listUserAdmins.dto';

const FUNCTION_NAME = 'ListUserAdminsRepository';

/**
 * Repository para gestionar operaciones de base de datos de usuarios administradores
 */
export class ListUserAdminsRepository {

  /**
   * Obtiene usuarios administradores con paginación y filtros usando sp_list_user_admins
   */
  async getUserAdmins(params: ListUserAdminsParams): Promise<UserAdminRecord[]> {
    try {
      logInfo(FUNCTION_NAME, 'Ejecutando sp_list_user_admins', {
        searchUsername: params.searchUsername,
        page: params.page,
        pageSize: params.pageSize,
        roleIds: params.roleIds,
      });

      // Preparar parámetros para el stored procedure
      const queryParams = [
        params.searchUsername,    // p_search_username
        params.page,             // p_page
        params.pageSize,         // p_page_size
        params.roleIds           // p_role_ids (PostgreSQL array)
      ];

      const query = 'SELECT * FROM sp_list_user_admins($1, $2, $3, $4)';
      const result = await dbConnector.query(query, queryParams);

      logInfo(FUNCTION_NAME, 'Usuarios administradores obtenidos exitosamente', {
        count: result.rows.length,
        totalCount: result.rows.length > 0 ? result.rows[0].total_count : 0,
      });

      return result.rows.map((row: any) => ({
        id: row.id,
        username: row.username,
        phone: row.phone,
        status: row.status,
        role_id: row.role_id,
        role_name: row.role_name,
        platform_id: row.platform_id,
        platform_name: row.platform_name,
        created_at: row.created_at,
        updated_at: row.updated_at,
        total_count: row.total_count,
      }));

    } catch (error) {
      logError(FUNCTION_NAME, error instanceof Error ? error : new Error('Error desconocido'), {
        operation: 'getUserAdmins',
        params,
      });
      throw new Error('Error al obtener los usuarios administradores');
    }
  }
} 