import { UpdatePackageTypeRepository } from '../repositories/updatePackageType.repo';
import { UpdatePackageTypeRequest, UpdatePackageTypeResponse } from '../dtos/updatePackageType.dto';
import { logInfo, logError } from '../../../../layers/utils/nodejs/utils';

const SERVICE_NAME = 'UpdatePackageTypeService';

export class UpdatePackageTypeService {
  private updatePackageTypeRepository: UpdatePackageTypeRepository;

  constructor() {
    this.updatePackageTypeRepository = new UpdatePackageTypeRepository();
  }

  /**
   * Actualiza un tipo de paquete
   */
  async updatePackageType(id: number, updateData: UpdatePackageTypeRequest): Promise<UpdatePackageTypeResponse> {
    const { name, status } = updateData;

    logInfo(SERVICE_NAME, 'Iniciando actualización de tipo de paquete', { 
      id,
      name: name.trim()
    });

    try {
      // Validar formato del nombre
      const trimmedName = name.trim();
      if (trimmedName.length < 2 || trimmedName.length > 50) {
        throw new Error('El nombre debe tener entre 2 y 50 caracteres');
      }

      // Validar caracteres permitidos (letras, números, espacios y algunos caracteres especiales)
      const validNamePattern = /^[a-zA-Z0-9\s\-_]+$/;
      if (!validNamePattern.test(trimmedName)) {
        throw new Error('El nombre solo puede contener letras, números, espacios, guiones y guiones bajos');
      }

      // Ejecutar stored procedure
      const result = await this.updatePackageTypeRepository.updatePackageType(id, trimmedName, status);
      
      if (!result.success) {
        logError(SERVICE_NAME, result.message, { id, name: trimmedName });
        // Lanzar error específico para que el handler pueda manejarlo apropiadamente
        throw new Error(result.message);
      }

      const response: UpdatePackageTypeResponse = {
        id: result.id!,
        name: result.name!, 
        status: result.status || null,
        message: result.message
      };

      logInfo(SERVICE_NAME, 'Tipo de paquete actualizado exitosamente', { 
        id: response.id,
        name: response.name,
        status: response.status || null
      });

      return response;

    } catch (error) {
      logError(SERVICE_NAME, error instanceof Error ? error.message : 'Error desconocido', { 
        id,
        name: name.trim()
      });
      throw error;
    }
  }
} 