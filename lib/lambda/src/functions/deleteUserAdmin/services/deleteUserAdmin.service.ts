import { DeleteUserAdminRepository } from '../repositories/deleteUserAdmin.repo';
import { DeleteUserAdminResult } from '../dtos/deleteUserAdmin.dto';

/**
 * Servicio para la lógica de negocio de eliminar usuario admin
 */
export class DeleteUserAdminService {
  private repository: DeleteUserAdminRepository;

  constructor() {
    this.repository = new DeleteUserAdminRepository();
  }

  /**
   * Elimina un usuario admin por ID
   * @param id ID del usuario admin (como string desde path params)
   * @returns Resultado de la eliminación
   */
  async deleteUserAdmin(id: string): Promise<{ success: boolean; data?: DeleteUserAdminResult; error?: string }> {
    try {
      // Validar el ID
      const idValidation = this.repository.validateId(id);
      if (!idValidation.isValid) {
        return { success: false, error: idValidation.error };
      }

      // Eliminar el usuario admin usando el repositorio
      const result = await this.repository.deleteUserAdmin(idValidation.numericId!);
      
      if (!result) {
        return { success: false, error: 'Error interno al eliminar usuario admin' };
      }

      if (!result.success) {
        return { success: false, error: result.message };
      }

      // Transformar a DeleteUserAdminResult
      const deleteResult: DeleteUserAdminResult = {
        deleted: result.success,
        message: result.message
      };

      return { success: true, data: deleteResult };

    } catch (error) {
      console.error('Error en deleteUserAdmin service:', error);
      return { success: false, error: 'Error interno al eliminar usuario admin' };
    }
  }

} 