import { ChangePackageUserStatusRepository } from '../repositories/changePackageUserStatus.repo';
import { ChangePackageUserStatusRequest, ChangePackageUserStatusResponse } from '../dtos/changePackageUserStatus.dto';

/**
 * Servicio para la lógica de negocio de cambio de status de paquetes de usuario
 */
export class ChangePackageUserStatusService {
  private repository: ChangePackageUserStatusRepository;

  constructor() {
    this.repository = new ChangePackageUserStatusRepository();
  }

  /**
   * Cambia el status de un paquete de usuario
   */
  async changePackageUserStatus(
    id: number,
    statusData: ChangePackageUserStatusRequest
  ): Promise<ChangePackageUserStatusResponse> {
    try {
      // Validar que el ID sea válido
      if (!id || id <= 0) {
        throw new Error('ID del paquete de usuario inválido');
      }

      // Validar que el status sea válido (0 o 1)
      if (statusData.status === undefined || statusData.status === null) {
        throw new Error('El status es requerido');
      }

      if (![0, 1].includes(statusData.status)) {
        throw new Error('El status debe ser 0 (inactivo) o 1 (activo)');
      }

      // Llamar al repositorio para cambiar el status
      const result = await this.repository.changePackageUserStatus(id, statusData.status);

      return result;
    } catch (error) {
      console.error('Error en ChangePackageUserStatusService:', error);
      throw error;
    }
  }
} 