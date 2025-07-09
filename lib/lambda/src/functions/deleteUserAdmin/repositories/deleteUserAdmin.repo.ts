import dbConnector from '../../../../layers/pg/nodejs/dbConnector';
import { DeleteUserAdminResponse } from '../dtos/deleteUserAdmin.dto';

/**
 * Repositorio para operaciones de eliminación de usuario admin en la base de datos
 */
export class DeleteUserAdminRepository {
  private db = dbConnector;

  constructor() {
    // El dbConnector ya está inicializado
  }

  /**
   * Elimina un usuario admin usando stored procedure
   * @param id ID del usuario admin
   * @returns Resultado de la eliminación
   */
  async deleteUserAdmin(id: number): Promise<DeleteUserAdminResponse | null> {
    try {
      // Ejecutar el stored procedure sp_delete_user_admin
      const query = 'SELECT * FROM sp_delete_user_admin($1)';
      const result = await this.db.query(query, [id]);

      if (result.rows.length === 0) {
        return null;
      }

      const row = result.rows[0];

      return {
        success: row.success,
        message: row.message
      };

    } catch (error) {
      console.error('Error en deleteUserAdmin repository:', error);
      throw new Error('Error al eliminar usuario admin');
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
} 