import dbConnector from '../../../../layers/pg/nodejs/dbConnector';
import { UpdateUserAdminResponse } from '../dtos/updateUserAdmin.dto';

/**
 * Repositorio para operaciones de actualización de usuario admin en la base de datos
 */
export class UpdateUserAdminRepository {
  private db = dbConnector;

  constructor() {
    // El dbConnector ya está inicializado
  }

  /**
   * Actualiza un usuario admin usando stored procedure
   * @param id ID del usuario admin
   * @param updateData Datos a actualizar
   * @returns Datos del usuario admin actualizado o null si hay error
   */
  async updateUserAdmin(
    id: number,
    updateData: {
      username?: string;
      password?: string;
      phone?: string;
      role_id?: number;
      platform_id?: number | null;
      status?: number;
    }
  ): Promise<UpdateUserAdminResponse | null> {
    try {
      // Ejecutar el stored procedure sp_update_user_admin
      const query = 'SELECT * FROM sp_update_user_admin($1, $2, $3, $4, $5, $6, $7)';
      const result = await this.db.query(query, [
        id,
        updateData.username || null,
        updateData.password || null,
        updateData.phone || null,
        updateData.role_id || null,
        updateData.platform_id !== undefined ? updateData.platform_id : null,
        updateData.status || null
      ]);

      if (result.rows.length === 0) {
        return null;
      }

      const row = result.rows[0];

      // Si el stored procedure retorna success = false, devolver null
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
      console.error('Error en updateUserAdmin repository:', error);
      throw new Error('Error al actualizar usuario admin');
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
   * Valida los datos de actualización
   * @param updateData Datos a actualizar
   * @returns Lista de errores de validación
   */
  validateUpdateData(updateData: any): string[] {
    const errors: string[] = [];

    // Validar username si se proporciona
    if (updateData.username !== undefined) {
      if (typeof updateData.username !== 'string' || updateData.username.trim().length === 0) {
        errors.push('Username debe ser una cadena no vacía');
      } else if (updateData.username.trim().length > 50) {
        errors.push('Username no puede exceder 50 caracteres');
      }
    }

    // Validar password si se proporciona
    if (updateData.password !== undefined) {
      if (typeof updateData.password !== 'string' || updateData.password.length === 0) {
        errors.push('Password debe ser una cadena no vacía');
      } else if (updateData.password.length > 255) {
        errors.push('Password no puede exceder 255 caracteres');
      }
    }

    // Validar phone si se proporciona
    if (updateData.phone !== undefined && updateData.phone !== null) {
      if (typeof updateData.phone !== 'string') {
        errors.push('Teléfono debe ser una cadena');
      } else if (updateData.phone.length > 20) {
        errors.push('Teléfono no puede exceder 20 caracteres');
      }
    }

    // Validar role_id si se proporciona
    if (updateData.role_id !== undefined) {
      if (!Number.isInteger(updateData.role_id) || updateData.role_id <= 0) {
        errors.push('role_id debe ser un número entero positivo');
      }
    }

    // Validar platform_id si se proporciona (puede ser null)
    if (updateData.platform_id !== undefined && updateData.platform_id !== null) {
      if (!Number.isInteger(updateData.platform_id) || updateData.platform_id <= 0) {
        errors.push('platform_id debe ser un número entero positivo o null');
      }
    }

    // Validar status si se proporciona
    if (updateData.status !== undefined) {
      if (!Number.isInteger(updateData.status) || ![0, 1, 2].includes(updateData.status)) {
        errors.push('Status debe ser 0 (inactivo), 1 (activo) o 2 (suspendido)');
      }
    }

    return errors;
  }
} 