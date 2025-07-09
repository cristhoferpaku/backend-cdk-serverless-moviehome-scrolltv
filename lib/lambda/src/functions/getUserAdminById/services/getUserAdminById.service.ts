import { GetUserAdminByIdRepository } from '../repositories/getUserAdminById.repo';
import { UserAdminDetails } from '../dtos/getUserAdminById.dto';

/**
 * Servicio para la lógica de negocio de obtener usuario admin por ID
 */
export class GetUserAdminByIdService {
  private repository: GetUserAdminByIdRepository;

  constructor() {
    this.repository = new GetUserAdminByIdRepository();
  }

  /**
   * Obtiene un usuario admin por ID
   * @param id ID del usuario admin (como string desde path params)
   * @returns Datos del usuario admin o null si no se encuentra/es inválido
   */
  async getUserAdminById(id: string): Promise<UserAdminDetails | null> {
    try {
      // Validar el ID
      const validation = this.repository.validateId(id);
      if (!validation.isValid) {
        console.log('ID inválido:', validation.error);
        return null;
      }

      // Obtener el usuario admin usando el repositorio
      const result = await this.repository.getUserAdminById(validation.numericId!);
      
      if (!result || !result.success) {
        console.log('Usuario admin no encontrado o error en BD:', result?.message);
        return null;
      }

      // Transformar a UserAdminDetails (remover campos internos como success/message)
      const userAdminDetails: UserAdminDetails = {
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

      return userAdminDetails;

    } catch (error) {
      console.error('Error en getUserAdminById service:', error);
      throw new Error('Error interno al obtener usuario admin');
    }
  }

  
} 