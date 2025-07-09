import dbConnector from '../../../../layers/pg/nodejs/dbConnector';
import { ChangeUserAdminStatusResponse } from '../dtos/changeUserAdminStatus.dto';

/**
 * Repositorio para operaciones de cambio de status de usuario admin en la base de datos
 */
export class ChangeUserAdminStatusRepository {
  private db = dbConnector;

  constructor() {
    // El dbConnector ya está inicializado
  }

  /**
   * Cambia el status de un usuario admin usando stored procedure
   * @param id ID del usuario admin
   * @param status Nuevo status
   * @returns Datos del usuario admin con status actualizado o null si hay error
   */
  async changeUserAdminStatus(
    id: number,
    status: number
  ): Promise<ChangeUserAdminStatusResponse | null> {
    try {
      // Ejecutar el stored procedure sp_change_user_admin_status
      const query = 'SELECT * FROM sp_change_user_admin_status($1, $2)';
      const result = await this.db.query(query, [id, status]);

      if (result.rows.length === 0) {
        return null;
      }

      const row = result.rows[0];

      // Si el stored procedure retorna success = false, devolver respuesta con error
      if (!row.success) {
        console.log('SP returned error:', row.message);
        return {
          id: row.id,
          username: row.username,
          phone: row.phone,
          status: row.status,
          role_id: row.role_id,
          role_name: row.role_name,
          platform_id: row.platform_id,
          platform_name: row.platform_name,
          created_at: row.created_at?.toISOString() || '',
          updated_at: row.updated_at?.toISOString() || '',
          success: false,
          message: row.message
        };
      }

      return {
        id: row.id,
        username: row.username,
        phone: row.phone,
        status: row.status,
        role_id: row.role_id,
        role_name: row.role_name,
        platform_id: row.platform_id,
        platform_name: row.platform_name,
        created_at: row.created_at?.toISOString() || '',
        updated_at: row.updated_at?.toISOString() || '',
        success: row.success,
        message: row.message
      };

    } catch (error) {
      console.error('Error en changeUserAdminStatus repository:', error);
      throw new Error('Error al cambiar status de usuario admin');
    }
  }

  /**
   * Valida que el ID sea un número válido
   * @param id ID a validar
   * @returns Objeto con validación y ID numérico
   */
  validateId(id: string): { isValid: boolean; numericId?: number; error?: string } {
    // Verificar que no esté vacío
    if (!id || id.trim() === '') {
      return { isValid: false, error: 'ID es requerido' };
    }

    // Verificar que sea un número
    const numericId = parseInt(id, 10);
    if (isNaN(numericId)) {
      return { isValid: false, error: 'ID debe ser un número válido' };
    }

    // Verificar que sea positivo
    if (numericId <= 0) {
      return { isValid: false, error: 'ID debe ser mayor a 0' };
    }

    return { isValid: true, numericId };
  }

  /**
   * Valida el status proporcionado
   * @param status Status a validar
   * @returns Objeto con validación
   */
  validateStatus(status: any): { isValid: boolean; error?: string } {
    // Verificar que no sea undefined o null
    if (status === undefined || status === null) {
      return { isValid: false, error: 'Status es requerido' };
    }

    // Verificar que sea un número entero
    if (!Number.isInteger(status)) {
      return { isValid: false, error: 'Status debe ser un número entero' };
    }

    // Verificar que esté en el rango válido (0, 1, 2)
    if (![0, 1, 2].includes(status)) {
      return { isValid: false, error: 'Status debe ser 0 (inactivo), 1 (activo) o 2 (suspendido)' };
    }

    return { isValid: true };
  }
} 