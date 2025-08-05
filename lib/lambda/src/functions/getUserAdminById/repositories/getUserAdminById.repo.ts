import dbConnector from '../../../../layers/pg/nodejs/dbConnector';
import { GetUserAdminByIdResponse } from '../dtos/getUserAdminById.dto';

/**
 * Repositorio para operaciones de obtener usuario admin por ID en la base de datos
 */
export class GetUserAdminByIdRepository {
  private db = dbConnector;

  constructor() {
    // El dbConnector ya está inicializado
  }

  /**
   * Obtiene un usuario admin por su ID usando stored procedure
   * @param id ID del usuario admin
   * @returns Datos del usuario admin o null si no se encuentra
   */
  async getUserAdminById(id: number): Promise<GetUserAdminByIdResponse | null> {
    try {
      // Ejecutar el stored procedure sp_get_user_admin_by_id
      const query = 'SELECT * FROM sp_get_user_admin_by_id($1)';
      const result = await this.db.query(query, [id]);

      if (result.rows.length === 0) {
        return null;
      }

      const row = result.rows[0];

      // Si el stored procedure retorna success = false, devolver null
      if (!row.success) {
        console.log('SP returned error:', row.message);
        return null;
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
        credit: row.credit,
        active_account: row.active_accounts,
        inactive_account: row.inactive_accounts,
        suspended_account: row.suspended_accounts,
        success: row.success,
        message: row.message
      };

    } catch (error) {
      console.error('Error en getUserAdminById repository:', error);
      throw new Error('Error al obtener usuario admin por ID');
    }
  }

  /**
   * Valida que el ID sea un número válido
   * @param id ID a validar
   * @returns true si es válido, false en caso contrario
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
} 