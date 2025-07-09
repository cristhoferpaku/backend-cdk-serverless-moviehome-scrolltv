import { CreatePackageSellerRepository } from '../repositories/createPackageSeller.repo';
import { CreatePackageSellerRequestDto, CreatePackageSellerResponseDto } from '../dtos/createPackageSeller.dto';
import { logInfo, logError } from '../../../../layers/utils/nodejs/utils';

export class CreatePackageSellerService {
  private repository: CreatePackageSellerRepository;
  private readonly serviceName = 'CreatePackageSellerService';

  constructor() {
    this.repository = new CreatePackageSellerRepository();
  }

  async createPackageSeller(requestDto: CreatePackageSellerRequestDto): Promise<CreatePackageSellerResponseDto> {
    try {
 
      
      // Validaciones de entrada
      this.validateInput(requestDto);

      // Ejecutar la creación usando el stored procedure
      const result = await this.repository.createPackageSeller(requestDto);
      
      // Verificar si el stored procedure tuvo éxito
      if (!result.success) {
        throw new Error(result.message);
      }

      logInfo(this.serviceName, 'Paquete vendedor creado exitosamente', {
        packageId: result.id,
        packageName: result.name,
        packageType: result.package_type_name
      });
      
      // Transformar respuesta
      return {
        id: result.id,
        name: result.name,
        credit: result.credit,
        platform_id: result.platform_id,
        platform_name: result.platform_name,
        package_type_id: result.package_type_id,
        package_type_name: result.package_type_name,
        status: result.status,
        created_at: result.created_at.toISOString(),
        updated_at: result.updated_at.toISOString()
      };
    } catch (error) {
      logError(this.serviceName, error instanceof Error ? error : 'Error desconocido', {
        name: requestDto.name
      });
      throw error;
    }
  }

  private validateInput(requestDto: CreatePackageSellerRequestDto): void {
    logInfo(this.serviceName, 'Validando entrada', { name: requestDto.name });

    if (!requestDto.name || requestDto.name.trim().length === 0) {
      throw new Error('El nombre del paquete es requerido');
    }

    if (requestDto.name.length > 50) {
      throw new Error('El nombre del paquete no puede exceder 50 caracteres');
    }

    if (requestDto.credit === undefined || requestDto.credit === null) {
      throw new Error('El crédito es requerido');
    }

    if (requestDto.credit < 0) {
      throw new Error('El crédito no puede ser negativo');
    }

    if (!Number.isInteger(requestDto.credit)) {
      throw new Error('El crédito debe ser un número entero');
    }

    if (requestDto.package_type_id === undefined || requestDto.package_type_id === null) {
      throw new Error('El tipo de paquete es requerido');
    }

    if (!Number.isInteger(requestDto.package_type_id) || requestDto.package_type_id <= 0) {
      throw new Error('El tipo de paquete debe ser un número entero positivo');
    }

    if (requestDto.platform_id === undefined || requestDto.platform_id === null) {
      throw new Error('El platform_id es requerido');
    }

    if (!Number.isInteger(requestDto.platform_id) || requestDto.platform_id <= 0) {
      throw new Error('El platform_id debe ser un número entero positivo');
    }

    if (requestDto.status !== undefined && requestDto.status !== null) {
      if (![0, 1].includes(requestDto.status)) {
        throw new Error('El status debe ser 0 (inactivo) o 1 (activo)');
      }
    }

    logInfo(this.serviceName, 'Validación exitosa');
  }
} 