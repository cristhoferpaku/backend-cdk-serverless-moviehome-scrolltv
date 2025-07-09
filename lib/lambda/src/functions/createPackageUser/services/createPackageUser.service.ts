import { CreatePackageUserRepository } from '../repositories/createPackageUser.repo';
import { 
  CreatePackageUserRequest, 
  CreatePackageUserResponse 
} from '../dtos/createPackageUser.dto';
import { logError, logInfo } from '../../../../layers/utils/nodejs/utils';

const FUNCTION_NAME = 'CreatePackageUserService';

/**
 * Service para la lógica de negocio de creación de paquetes de usuario
 */
export class CreatePackageUserService {
  private createPackageUserRepository: CreatePackageUserRepository;

  constructor() {
    this.createPackageUserRepository = new CreatePackageUserRepository();
  }

  /**
   * Crear un nuevo paquete de usuario
   */
  async createPackageUser(packageUserData: CreatePackageUserRequest): Promise<CreatePackageUserResponse> {
    try {
      // Validaciones de negocio
      this.validatePackageUserData(packageUserData);

      logInfo(FUNCTION_NAME, 'Iniciando creación de paquete de usuario', {
        name: packageUserData.name,
        package_type_id: packageUserData.package_type_id,
        platform_id: packageUserData.platform_id,
        duration_value: packageUserData.duration_value,
        duration_type: packageUserData.duration_type
      });

      // Crear el paquete de usuario usando el repository
      const dbResult = await this.createPackageUserRepository.createPackageUser(packageUserData);

      if (dbResult.success) {
        logInfo(FUNCTION_NAME, 'Paquete de usuario creado exitosamente', {
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
      logError(FUNCTION_NAME, error instanceof Error ? error : 'Error desconocido', {
        packageUserData: {
          name: packageUserData.name,
          package_type_id: packageUserData.package_type_id,
          platform_id: packageUserData.platform_id
        }
      });

      return {
        success: false,
        message: error instanceof Error ? error.message : 'Error interno del servidor'
      };
    }
  }

  /**
   * Validaciones de negocio para los datos del paquete de usuario
   */
  private validatePackageUserData(data: CreatePackageUserRequest): void {
    // Validar nombre
    if (!data.name || typeof data.name !== 'string' || data.name.trim().length === 0) {
      throw new Error('El nombre del paquete es requerido');
    }

    if (data.name.trim().length > 50) {
      throw new Error('El nombre del paquete no puede exceder 50 caracteres');
    }

    // Validar package_type_id
    if (!data.package_type_id || !Number.isInteger(data.package_type_id) || data.package_type_id <= 0) {
      throw new Error('El tipo de paquete debe ser un número entero positivo');
    }

    // Validar platform_id
    if (!data.platform_id || !Number.isInteger(data.platform_id) || data.platform_id <= 0) {
      throw new Error('La plataforma debe ser un número entero positivo');
    }

    // Validar duration_value
    if (!data.duration_value || !Number.isInteger(data.duration_value) || data.duration_value <= 0) {
      throw new Error('La duración debe ser un número entero positivo');
    }

    // Validar duration_type
    if (!data.duration_type || !['days', 'hours'].includes(data.duration_type)) {
      throw new Error('El tipo de duración debe ser "days" o "hours"');
    }

    // Validar max_devices (opcional)
    if (data.max_devices !== undefined) {
      if (!Number.isInteger(data.max_devices) || data.max_devices < 1 || data.max_devices > 3) {
        throw new Error('El número máximo de dispositivos debe estar entre 1 y 3');
      }
    }

    // Validar discount_credits (opcional)
    if (data.discount_credits !== undefined && typeof data.discount_credits !== 'boolean') {
      throw new Error('El descuento de créditos debe ser un valor booleano');
    }
  }
} 