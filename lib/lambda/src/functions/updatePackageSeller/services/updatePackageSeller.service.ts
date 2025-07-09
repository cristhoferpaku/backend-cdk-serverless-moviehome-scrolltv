import { UpdatePackageSellerRepository } from '../repositories/updatePackageSeller.repo';
import { UpdatePackageSellerRequest, UpdatePackageSellerResponse } from '../dtos/updatePackageSeller.dto';
import { logInfo, logError } from '../../../../layers/utils/nodejs/utils';

const SERVICE_NAME = 'UpdatePackageSellerService';

export class UpdatePackageSellerService {
  private updatePackageSellerRepository: UpdatePackageSellerRepository;

  constructor() {
    this.updatePackageSellerRepository = new UpdatePackageSellerRepository();
  }

  /**
   * Actualiza un paquete vendedor (actualización parcial)
   */
  async updatePackageSeller(id: number, updateData: UpdatePackageSellerRequest): Promise<UpdatePackageSellerResponse> {
    logInfo(SERVICE_NAME, 'Iniciando actualización de paquete vendedor', { 
      id, 
      updateData: this.sanitizeLogData(updateData) 
    });

    try {
      // Validar que se proporcione al menos un campo para actualizar
      if (this.isEmptyUpdate(updateData)) {
        throw new Error('Debe proporcionar al menos un campo para actualizar');
      }

      // Validar los datos de entrada
      this.validateUpdateData(updateData);

      // Ejecutar stored procedure
      const result = await this.updatePackageSellerRepository.updatePackageSeller(
        id,
        updateData.name?.trim(),
        updateData.credit,
        updateData.packageTypeId,
        updateData.platformId,
        updateData.status
      );
      
      if (!result.success) {
        logError(SERVICE_NAME, result.message, { id, updateData: this.sanitizeLogData(updateData) });
        // Lanzar error específico para que el handler pueda manejarlo apropiadamente
        throw new Error(result.message);
      }

      // Transformar la respuesta
      const response: UpdatePackageSellerResponse = {
        id: result.id!,
        name: result.name!,
        credit: result.credit!,
        platformId: result.platform_id,
        platformName: result.platform_name,
        packageTypeId: result.package_type_id!,
        packageTypeName: result.package_type_name!,
        status: result.status!,
        createdAt: result.created_at!.toISOString(),
        updatedAt: result.updated_at!.toISOString(),
        message: result.message
      };

      logInfo(SERVICE_NAME, 'Paquete vendedor actualizado exitosamente', {
        id: response.id,
        name: response.name,
        packageTypeName: response.packageTypeName,
        platformName: response.platformName,
        status: response.status
      });
      
      return response;
    } catch (error) {
      logError(SERVICE_NAME, error instanceof Error ? error : 'Error desconocido', { 
        id, 
        updateData: this.sanitizeLogData(updateData) 
      });
      throw error;
    }
  }

  /**
   * Valida que al menos un campo esté presente para actualización
   */
  private isEmptyUpdate(updateData: UpdatePackageSellerRequest): boolean {
    const { name, credit, packageTypeId, platformId, status } = updateData;
    return (
      (name === undefined || name.trim() === '') &&
      credit === undefined &&
      packageTypeId === undefined &&
      platformId === undefined &&
      status === undefined
    );
  }

  /**
   * Valida los datos de actualización
   */
  private validateUpdateData(updateData: UpdatePackageSellerRequest): void {
    // Validar nombre si se proporciona
    if (updateData.name !== undefined) {
      if (typeof updateData.name !== 'string') {
        throw new Error('El nombre debe ser una cadena de texto');
      }
      
      const trimmedName = updateData.name.trim();
      if (trimmedName === '') {
        throw new Error('El nombre no puede estar vacío');
      }
      
      if (trimmedName.length > 50) {
        throw new Error('El nombre no puede exceder 50 caracteres');
      }
      
      // Validar caracteres permitidos (letras, números, espacios, guiones)
      if (!/^[a-zA-Z0-9\s\-_áéíóúÁÉÍÓÚñÑ]+$/.test(trimmedName)) {
        throw new Error('El nombre solo puede contener letras, números, espacios y guiones');
      }
    }

    // Validar crédito si se proporciona
    if (updateData.credit !== undefined) {
      if (!Number.isInteger(updateData.credit) || updateData.credit < 0) {
        throw new Error('El crédito debe ser un número entero no negativo');
      }
    }

    // Validar packageTypeId si se proporciona
    if (updateData.packageTypeId !== undefined) {
      if (!Number.isInteger(updateData.packageTypeId) || updateData.packageTypeId <= 0) {
        throw new Error('El ID del tipo de paquete debe ser un número entero positivo');
      }
    }

    // Validar platformId si se proporciona
    if (updateData.platformId !== undefined) {
      if (!Number.isInteger(updateData.platformId) || updateData.platformId <= 0) {
        throw new Error('El ID de la plataforma debe ser un número entero positivo');
      }
    }

    // Validar status si se proporciona
    if (updateData.status !== undefined) {
      if (!Number.isInteger(updateData.status) || ![0, 1, 2].includes(updateData.status)) {
        throw new Error('El estado debe ser 0 (inactivo), 1 (activo) o 2 (expirado)');
      }
    }

    logInfo(SERVICE_NAME, 'Datos de actualización validados exitosamente', { 
      fieldsToUpdate: Object.keys(updateData).filter(key => updateData[key as keyof UpdatePackageSellerRequest] !== undefined)
    });
  }

  /**
   * Sanitiza los datos para logging (elimina información sensible)
   */
  private sanitizeLogData(updateData: UpdatePackageSellerRequest): any {
    return {
      hasName: updateData.name !== undefined,
      hasCredit: updateData.credit !== undefined,
      hasPackageTypeId: updateData.packageTypeId !== undefined,
      hasPlatformId: updateData.platformId !== undefined,
      hasStatus: updateData.status !== undefined,
      fieldsCount: Object.keys(updateData).filter(key => updateData[key as keyof UpdatePackageSellerRequest] !== undefined).length
    };
  }
} 