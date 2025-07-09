import { DeletePackageUserRepository } from '../repositories/deletePackageUser.repo';
import { DeletePackageUserResponse } from '../dtos/deletePackageUser.dto';

/**
 * Servicio para la lógica de negocio de eliminación de paquetes de usuario
 */
export class DeletePackageUserService {
  private repository: DeletePackageUserRepository;

  constructor() {
    this.repository = new DeletePackageUserRepository();
  }

  /**
   * Elimina un paquete de usuario
   */
  async deletePackageUser(id: number): Promise<DeletePackageUserResponse> {
    try {
      // Validar que el ID sea válido
      if (!id || id <= 0) {
        throw new Error('ID del paquete de usuario inválido');
      }

      // Llamar al repositorio para eliminar
      const result = await this.repository.deletePackageUser(id);

      return result;
    } catch (error) {
      console.error('Error en DeletePackageUserService:', error);
      throw error;
    }
  }
} 