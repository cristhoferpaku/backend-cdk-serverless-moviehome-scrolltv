import bcrypt from 'bcryptjs';
import { UpdateUserAdminRepository } from '../repositories/updateUserAdmin.repo';
import { UpdatedUserAdminDetails, UpdateUserAdminBody } from '../dtos/updateUserAdmin.dto';

/**
 * Servicio para la lógica de negocio de actualizar usuario admin
 */
export class UpdateUserAdminService {
  private repository: UpdateUserAdminRepository;

  constructor() {
    this.repository = new UpdateUserAdminRepository();
  }

  /**
   * Actualiza un usuario admin por ID
   * @param id ID del usuario admin (como string desde path params)
   * @param updateData Datos a actualizar
   * @returns Datos del usuario admin actualizado o error
   */
  async updateUserAdmin(
    id: string, 
    updateData: UpdateUserAdminBody
  ): Promise<{ success: boolean; data?: UpdatedUserAdminDetails; error?: string }> {
    try {
      // Validar el ID
      const idValidation = this.repository.validateId(id);
      if (!idValidation.isValid) {
        return { success: false, error: idValidation.error };
      }

      // Validar datos de actualización
      const validationErrors = this.repository.validateUpdateData(updateData);
      if (validationErrors.length > 0) {
        return { success: false, error: validationErrors.join(', ') };
      }

      // Verificar que al menos un campo se esté actualizando
      const fieldsToUpdate = Object.keys(updateData).filter(key => updateData[key as keyof UpdateUserAdminBody] !== undefined);
      if (fieldsToUpdate.length === 0) {
        return { success: false, error: 'Se debe proporcionar al menos un campo para actualizar' };
      }

      // Preparar datos para actualización
      const updatePayload: any = { ...updateData };

      // Hash de password si se proporciona
      if (updateData.password) {
        try {
          const saltRounds = 12;
          updatePayload.password = await bcrypt.hash(updateData.password, saltRounds);
        } catch (error) {
          console.error('Error hasheando password:', error);
          return { success: false, error: 'Error procesando el password' };
        }
      }

      // Actualizar el usuario admin usando el repositorio
      const result = await this.repository.updateUserAdmin(idValidation.numericId!, updatePayload);
      
      if (!result) {
        return { success: false, error: 'Error interno al actualizar usuario admin' };
      }

      if (!result.success) {
        return { success: false, error: result.message };
      }

      // Transformar a UpdatedUserAdminDetails (remover campos internos como success/message)
      const updatedUserAdminDetails: UpdatedUserAdminDetails = {
        id: result.id,
        username: result.username,
        phone: result.phone,
        status: result.status,
        role_id: result.role_id,
        role_name: result.role_name,
        platform_id: result.platform_id,
        platform_name: result.platform_name,
        created_at: result.created_at,
        updated_at: result.updated_at
      };

      return { success: true, data: updatedUserAdminDetails };

    } catch (error) {
      console.error('Error en updateUserAdmin service:', error);
      return { success: false, error: 'Error interno al actualizar usuario admin' };
    }
  }

  /**
   * Valida que el usuario tenga permisos para actualizar el recurso solicitado
   * @param requestingUserId ID del usuario que hace la petición
   * @param targetUserId ID del usuario que se quiere actualizar
   * @param requestingUserRole Rol del usuario que hace la petición
   * @param updateData Datos que se quieren actualizar
   * @returns true si tiene permisos, false en caso contrario
   */
 
} 