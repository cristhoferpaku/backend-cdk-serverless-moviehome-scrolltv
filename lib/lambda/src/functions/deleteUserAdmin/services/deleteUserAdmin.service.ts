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

  /**
   * Valida que el usuario tenga permisos para eliminar el recurso solicitado
   * @param requestingUserId ID del usuario que hace la petición
   * @param targetUserId ID del usuario que se quiere eliminar
   * @param requestingUserRole Rol del usuario que hace la petición
   * @returns true si tiene permisos, false en caso contrario
   */
  validateDeletePermissions(
    requestingUserId: number, 
    targetUserId: number, 
    requestingUserRole: string
  ): { hasPermissions: boolean; error?: string } {
    
    // Los administradores pueden eliminar cualquier usuario
    if (requestingUserRole.toLowerCase() === 'administrador') {
      return { hasPermissions: true };
    }

    // Los usuarios no pueden eliminar a otros usuarios (ni siquiera a sí mismos por seguridad)
    return { 
      hasPermissions: false, 
      error: 'No tienes permisos para eliminar usuarios. Solo los administradores pueden realizar esta acción.' 
    };
  }
} 