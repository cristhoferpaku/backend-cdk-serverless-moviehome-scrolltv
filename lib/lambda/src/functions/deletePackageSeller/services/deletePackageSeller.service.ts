import { DeletePackageSellerRepository } from '../repositories/deletePackageSeller.repo';
import { DeletePackageSellerRequest, DeletePackageSellerResponse } from '../dtos/deletePackageSeller.dto';
import { logInfo, logError } from '../../../../layers/utils/nodejs/utils';

const SERVICE_NAME = 'DeletePackageSellerService';

export class DeletePackageSellerService {
  private deletePackageSellerRepository: DeletePackageSellerRepository;

  constructor() {
    this.deletePackageSellerRepository = new DeletePackageSellerRepository();
  }

  async deletePackageSeller(requestData: DeletePackageSellerRequest): Promise<DeletePackageSellerResponse> {
    try {
      logInfo(SERVICE_NAME, 'Iniciando eliminación de paquete vendedor', {
        packageSellerId: requestData.id
      });

      // Validar que el ID sea válido
      if (!requestData.id || requestData.id <= 0) {
        throw new Error('ID de paquete vendedor inválido');
      }

      // Ejecutar eliminación usando el stored procedure
      const result = await this.deletePackageSellerRepository.deletePackageSeller(requestData.id);

      // Verificar si la eliminación fue exitosa
      if (!result.success) {
        logError(SERVICE_NAME, result.message, {
          packageSellerId: requestData.id
        });
        return {
          success: false,
          message: result.message
        };
      }

      logInfo(SERVICE_NAME, 'Paquete vendedor eliminado exitosamente', {
        packageSellerId: requestData.id,
        message: result.message
      });

      return {
        success: true,
        message: result.message
      };

    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Error desconocido';
      
      logError(SERVICE_NAME, error instanceof Error ? error : 'Error desconocido', {
        packageSellerId: requestData.id
      });

      return {
        success: false,
        message: errorMessage
      };
    }
  }

  /**
   * Valida el ID del paquete vendedor
   */
  private validatePackageSellerId(id: any): number {
    const numericId = parseInt(id);
    
    if (isNaN(numericId) || numericId <= 0) {
      throw new Error('ID de paquete vendedor debe ser un número entero positivo');
    }

    return numericId;
  }
} 