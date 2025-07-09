import { DeletePackageTypeRepository } from '../repositories/deletePackageType.repo';
import { DeletePackageTypeRequest, DeletePackageTypeResponse } from '../dtos/deletePackageType.dto';
import { logInfo, logError } from '../../../../layers/utils/nodejs/utils';

export class DeletePackageTypeService {
  private repository: DeletePackageTypeRepository;
  private readonly serviceName = 'DeletePackageTypeService';

  constructor() {
    this.repository = new DeletePackageTypeRepository();
  }

  async deletePackageType(requestData: DeletePackageTypeRequest): Promise<DeletePackageTypeResponse> {
    try {
      logInfo(this.serviceName, 'Iniciando eliminación de tipo de paquete', {
        id: requestData.id
      });
      
      // Validaciones de entrada
      this.validateInput(requestData);

      // Ejecutar la eliminación usando el stored procedure
      const result = await this.repository.deletePackageType(requestData.id);
      
      // El stored procedure ya maneja las validaciones y retorna success/message
      if (result.success) {
        logInfo(this.serviceName, 'Tipo de paquete eliminado exitosamente', {
          id: requestData.id,
          message: result.message
        });
      } else {
        logInfo(this.serviceName, 'No se pudo eliminar el tipo de paquete', {
          id: requestData.id,
          reason: result.message
        });
      }
      
      // Retornar directamente el resultado del stored procedure
      return {
        success: result.success,
        message: result.message
      };
    } catch (error) {
      logError(this.serviceName, error instanceof Error ? error : 'Error desconocido', {
        id: requestData.id
      });
      throw error;
    }
  }

  private validateInput(requestData: DeletePackageTypeRequest): void {
    logInfo(this.serviceName, 'Validando entrada', { id: requestData.id });

    if (requestData.id === undefined || requestData.id === null) {
      throw new Error('El ID del tipo de paquete es requerido');
    }

    if (!Number.isInteger(requestData.id) || requestData.id <= 0) {
      throw new Error('El ID del tipo de paquete debe ser un número entero positivo');
    }

    logInfo(this.serviceName, 'Validación exitosa');
  }
} 