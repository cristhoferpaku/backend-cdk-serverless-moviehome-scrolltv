import { CreatePackageTypeRepository } from '../repositories/createPackageType.repo';
import { CreatePackageTypeRequest, CreatePackageTypeResponse } from '../dtos/createPackageType.dto';
import { logInfo, logError } from '../../../../layers/utils/nodejs/utils';

export class CreatePackageTypeService {
  private repository: CreatePackageTypeRepository;
  private readonly serviceName = 'CreatePackageTypeService';

  constructor() {
    this.repository = new CreatePackageTypeRepository();
  }

  async createPackageType(requestData: CreatePackageTypeRequest): Promise<CreatePackageTypeResponse> {
    try {
      logInfo(this.serviceName, 'Iniciando creación de tipo de paquete', {
        name: requestData.name
      });
      
      // Validaciones de entrada
      this.validateInput(requestData);

      // Ejecutar la creación usando el stored procedure
      const result = await this.repository.createPackageType(requestData.name, requestData.status);
      
      // Verificar si el stored procedure tuvo éxito
      if (!result.success) {
        throw new Error(result.message);
      }

      logInfo(this.serviceName, 'Tipo de paquete creado exitosamente', {
        typeId: result.id,
        typeName: result.name
      });
      
      // Transformar respuesta
      return {
        id: result.id,
        name: result.name,
        status: result.status
      };
    } catch (error) {
      logError(this.serviceName, error instanceof Error ? error : 'Error desconocido', {
        name: requestData.name
      });
      throw error;
    }
  }

  private validateInput(requestData: CreatePackageTypeRequest): void {
    logInfo(this.serviceName, 'Validando entrada', { name: requestData.name });

    if (!requestData.name || requestData.name.trim().length === 0) {
      throw new Error('El nombre del tipo de paquete es requerido');
    }

    if (requestData.name.length > 50) {
      throw new Error('El nombre del tipo de paquete no puede exceder 50 caracteres');
    }

    // Validar caracteres permitidos (solo letras, números, espacios y algunos símbolos)
    const validNamePattern = /^[a-zA-Z0-9\s\-_]+$/;
    if (!validNamePattern.test(requestData.name)) {
      throw new Error('El nombre del tipo de paquete contiene caracteres no válidos');
    }

    logInfo(this.serviceName, 'Validación exitosa');
  }
} 