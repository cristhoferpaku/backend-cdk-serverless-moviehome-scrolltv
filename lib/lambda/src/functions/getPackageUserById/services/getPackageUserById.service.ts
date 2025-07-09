import { GetPackageUserByIdRepository } from '../repositories/getPackageUserById.repo';
import { GetPackageUserByIdResponse } from '../dtos/getPackageUserById.dto';
import { logError, logInfo } from '../../../../layers/utils/nodejs/utils';

const FUNCTION_NAME = 'GetPackageUserByIdService';

/**
 * Service para la lógica de negocio de obtener paquete de usuario por ID
 */
export class GetPackageUserByIdService {
  private getPackageUserByIdRepository: GetPackageUserByIdRepository;

  constructor() {
    this.getPackageUserByIdRepository = new GetPackageUserByIdRepository();
  }

  /**
   * Obtener un paquete de usuario por ID
   */
  async getPackageUserById(id: number): Promise<GetPackageUserByIdResponse> {
    try {
      // Validaciones
      this.validateId(id);

      logInfo(FUNCTION_NAME, 'Iniciando búsqueda de paquete de usuario', { id });

      // Obtener el paquete de usuario usando el repository
      const dbResult = await this.getPackageUserByIdRepository.getPackageUserById(id);

      if (dbResult.success) {
        logInfo(FUNCTION_NAME, 'Paquete de usuario encontrado exitosamente', {
          id: dbResult.id,
          name: dbResult.name
        });

        return {
          success: true,
          message: dbResult.message,
          data: {
            id: dbResult.id,
            name: dbResult.name,
            package_type_id: dbResult.package_type_id,
            package_type_name: dbResult.package_type_name,
            max_devices: dbResult.max_devices,
            platform_id: dbResult.platform_id,
            platform_name: dbResult.platform_name,
            duration_value: dbResult.duration_value,
            duration_type: dbResult.duration_type,
            discount_credits: dbResult.discount_credits,
            status: dbResult.status,
            created_at: dbResult.created_at,
            updated_at: dbResult.updated_at
          }
        };
      }

      return {
        success: false,
        message: dbResult.message
      };

    } catch (error) {
      logError(FUNCTION_NAME, error instanceof Error ? error : 'Error desconocido', { id });

      return {
        success: false,
        message: error instanceof Error ? error.message : 'Error interno del servidor'
      };
    }
  }

  /**
   * Validar ID del paquete de usuario
   */
  private validateId(id: number): void {
    if (!id || !Number.isInteger(id) || id <= 0) {
      throw new Error('ID del paquete debe ser un número entero positivo');
    }
  }
} 