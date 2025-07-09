import { ChangePackageSellerStatusRepository } from '../repositories/changePackageSellerStatus.repo';
import { 
  ChangePackageSellerStatusRequest, 
  ChangePackageSellerStatusResponse,
  ChangePackageSellerStatusDbResult
} from '../dtos/changePackageSellerStatus.dto';
import { logInfo, logError } from '../../../../layers/utils/nodejs/utils';

const FUNCTION_NAME = 'ChangePackageSellerStatusService';

/**
 * Service para el cambio de status de paquete vendedor
 */
export class ChangePackageSellerStatusService {
  private repository: ChangePackageSellerStatusRepository;

  constructor() {
    this.repository = new ChangePackageSellerStatusRepository();
  }

  /**
   * Cambia el status de un paquete vendedor
   * @param id - ID del paquete vendedor
   * @param requestData - Datos de la petición con el nuevo status
   * @returns Información del paquete actualizado o null si hay error
   */
  async changePackageSellerStatus(id: number, requestData: ChangePackageSellerStatusRequest): Promise<ChangePackageSellerStatusResponse | null> {
    try {
      logInfo(FUNCTION_NAME, 'Iniciando cambio de status de paquete vendedor', { 
        packageSellerId: id,
        newStatus: requestData.status
      });

      // Validar que el status sea válido (0: inactivo, 1: activo, 2: expirado)
      if (![0, 1, 2].includes(requestData.status)) {
        logError(FUNCTION_NAME, 'Status inválido proporcionado', { 
          packageSellerId: id,
          invalidStatus: requestData.status,
          validStatuses: [0, 1, 2]
        });
        return null;
      }

      // Ejecutar cambio de status en la base de datos
      const result: ChangePackageSellerStatusDbResult | null = await this.repository.changePackageSellerStatus(
        id, 
        requestData.status
      );

      if (!result) {
        logError(FUNCTION_NAME, 'No se obtuvo resultado de la base de datos', { packageSellerId: id });
        return null;
      }

      // Verificar si la operación fue exitosa
      if (!result.success) {
        logError(FUNCTION_NAME, 'Error en la operación de cambio de status', { 
          packageSellerId: id,
          dbMessage: result.message
        });
        return null;
      }

      logInfo(FUNCTION_NAME, 'Status del paquete vendedor cambiado exitosamente', {
        packageSellerId: result.id,
        packageName: result.name,
        oldStatus: 'N/A', // No tenemos el status anterior en este contexto
        newStatus: result.status
      });

      // Convertir resultado de DB a response DTO
      const response: ChangePackageSellerStatusResponse = {
        id: result.id,
        name: result.name,
        credit: result.credit,
        platform_id: result.platform_id,
        platform_name: result.platform_name,
        package_type_id: result.package_type_id,
        package_type_name: result.package_type_name,
        status: result.status,
        created_at: result.created_at.toISOString(),
        updated_at: result.updated_at.toISOString(),
      };

      return response;

    } catch (error) {
      logError(FUNCTION_NAME, error instanceof Error ? error : 'Error desconocido en cambio de status', {
        packageSellerId: id,
        status: requestData.status,
        error: error instanceof Error ? error.message : 'Error desconocido'
      });
      return null;
    }
  }
} 