import { UpdatePackageUserRepository } from '../repositories/updatePackageUser.repo';
import { UpdatePackageUserRequest, UpdatePackageUserResponse } from '../dtos/updatePackageUser.dto';

/**
 * Servicio para la lógica de negocio de actualización de paquetes de usuario
 */
export class UpdatePackageUserService {
  private repository: UpdatePackageUserRepository;

  constructor() {
    this.repository = new UpdatePackageUserRepository();
  }

  /**
   * Actualiza un paquete de usuario
   */
  async updatePackageUser(
    id: number,
    updateData: UpdatePackageUserRequest
  ): Promise<UpdatePackageUserResponse> {
    try {
      // Validar que al menos un campo esté presente para actualizar
      const hasValidFields = Object.keys(updateData).some(key => {
        const value = updateData[key as keyof UpdatePackageUserRequest];
        return value !== undefined && value !== null && value !== '';
      });

      if (!hasValidFields) {
        throw new Error('Debe proporcionar al menos un campo para actualizar');
      }

      // Validaciones adicionales en el servicio
      if (updateData.name !== undefined && (!updateData.name || updateData.name.trim() === '')) {
        throw new Error('El nombre no puede estar vacío');
      }

      if (updateData.max_devices !== undefined && (updateData.max_devices < 1 || updateData.max_devices > 3)) {
        throw new Error('El número máximo de dispositivos debe estar entre 1 y 3');
      }

      if (updateData.duration_value !== undefined && updateData.duration_value <= 0) {
        throw new Error('La duración debe ser mayor a 0');
      }

      if (updateData.duration_type !== undefined && !['days', 'hours'].includes(updateData.duration_type)) {
        throw new Error('El tipo de duración debe ser "days" o "hours"');
      }

      if (updateData.status !== undefined && ![0, 1].includes(updateData.status)) {
        throw new Error('El status debe ser 0 (inactivo) o 1 (activo)');
      }

      // Llamar al repositorio para actualizar
      const result = await this.repository.updatePackageUser(id, updateData);

      return result;
    } catch (error) {
      console.error('Error en UpdatePackageUserService:', error);
      throw error;
    }
  }
} 