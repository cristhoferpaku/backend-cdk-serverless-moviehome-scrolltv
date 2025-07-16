import { ChangeUserAdminStatusRepository } from '../repositories/changeUserAdminStatus.repo';
import { UpdatedStatusUserAdminDetails, ChangeUserAdminStatusBody } from '../dtos/changeUserAdminStatus.dto';

/**
 * Servicio para la lógica de negocio de cambiar status de usuario admin
 */
export class ChangeUserAdminStatusService {
  private repository: ChangeUserAdminStatusRepository;

  constructor() {
    this.repository = new ChangeUserAdminStatusRepository();
  }

  /**
   * Cambia el status de un usuario admin por ID
   * @param id ID del usuario admin (como string desde path params)
   * @param statusData Datos del nuevo status
   * @returns Datos del usuario admin con status actualizado o error
   */
  async changeUserAdminStatus(
    id: string, 
    statusData: ChangeUserAdminStatusBody
  ): Promise<{ success: boolean; data?: UpdatedStatusUserAdminDetails; error?: string }> {
    try {
      // Validar el ID
      const idValidation = this.repository.validateId(id);
      if (!idValidation.isValid) {
        return { success: false, error: idValidation.error };
      }

      // Validar el status
      const statusValidation = this.repository.validateStatus(statusData.status);
      if (!statusValidation.isValid) {
        return { success: false, error: statusValidation.error };
      }

      // Cambiar el status del usuario admin usando el repositorio
      const result = await this.repository.changeUserAdminStatus(
        idValidation.numericId!, 
        statusData.status
      );
      
      if (!result) {
        return { success: false, error: 'Error interno al cambiar status de usuario admin' };
      }

      if (!result.success) {
        return { success: false, error: result.message };
      }

      // Transformar a UpdatedStatusUserAdminDetails (remover campos internos como success/message)
      const updatedUserAdminDetails: UpdatedStatusUserAdminDetails = {
        id: result.id,
        username: result.username,
        phone: result.phone,
        status: result.status,
        role_id: result.role_id,
        role_name: result.role_name,
        platform_id: result.platform_id,
        platform_name: result.platform_name,
        created_at: result.created_at,
        updated_at: result.updated_at
      };

      return { success: true, data: updatedUserAdminDetails };

    } catch (error) {
      console.error('Error en changeUserAdminStatus service:', error);
      return { success: false, error: 'Error interno al cambiar status de usuario admin' };
    }
  }

  getStatusDescription(status: number): string {
    switch (status) {
      case 0:
        return 'inactivo';
      case 1:
        return 'activo';
      case 2:
        return 'suspendido';
      default:
        return 'desconocido';
    }
  }
} 