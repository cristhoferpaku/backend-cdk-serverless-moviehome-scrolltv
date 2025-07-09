import { ListPackageUsersRepository } from '../repositories/listPackageUsers.repo';
import { ListPackageUsersRequest, ListPackageUsersResponse } from '../dtos/listPackageUsers.dto';

/**
 * Servicio para la lógica de negocio del listado de paquetes de usuario
 */
export class ListPackageUsersService {
  private repository: ListPackageUsersRepository;

  constructor() {
    this.repository = new ListPackageUsersRepository();
  }

  /**
   * Lista paquetes de usuario con paginación y búsqueda
   */
  async listPackageUsers(request: ListPackageUsersRequest): Promise<ListPackageUsersResponse> {
    try {
      // Validar y establecer valores por defecto
      const page = Math.max(1, request.page || 1);
      const limit = Math.min(Math.max(1, request.limit || 10), 100); // Máximo 100 registros por página
      const search = request.search?.trim();

      // Obtener los datos del repositorio
      const { items, total } = await this.repository.getPackageUsers(search, page, limit);

      // Calcular información de paginación
      const totalPages = Math.ceil(total / limit);
      const hasNext = page < totalPages;
      const hasPrevious = page > 1;

      // Construir respuesta
      const response: ListPackageUsersResponse = {
        items,
        pagination: {
          page,
          limit,
          total,
          totalPages,
          hasNext,
          hasPrevious
        }
      };

      return response;
    } catch (error) {
      console.error('Error en ListPackageUsersService:', error);
      throw error;
    }
  }
} 