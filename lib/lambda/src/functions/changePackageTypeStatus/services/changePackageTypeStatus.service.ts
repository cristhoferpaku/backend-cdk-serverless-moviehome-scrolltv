import { ChangePackageTypeStatusRepository } from '../repositories/changePackageTypeStatus.repo';
import { ChangePackageTypeStatusRequest, ChangePackageTypeStatusResponse } from '../dtos/changePackageTypeStatus.dto';

export class ChangePackageTypeStatusService {
  private changePackageTypeStatusRepository: ChangePackageTypeStatusRepository;

  constructor() {
    this.changePackageTypeStatusRepository = new ChangePackageTypeStatusRepository();
  }

  /**
   * Cambia el status de un package type con validaciones de negocio
   */
  async changePackageTypeStatus(
    id: number,
    statusData: ChangePackageTypeStatusRequest
  ): Promise<ChangePackageTypeStatusResponse> {
    
    // Validaciones de entrada
    if (!id || id <= 0) {
      throw new Error('ID del package type inválido');
    }

    if (statusData.status === undefined || statusData.status === null) {
      throw new Error('El campo "status" es requerido');
    }

    // Validar que el status sea válido (0 o 1)
    if (![0, 1].includes(statusData.status)) {
      throw new Error('El status debe ser 0 (inactivo) o 1 (activo)');
    }

    try {
      const result = await this.changePackageTypeStatusRepository.changePackageTypeStatus(
        id, 
        statusData
      );

      return result;
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
      throw new Error('Error interno del servidor al cambiar el status del package type');
    }
  }
} 