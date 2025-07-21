import { ListUserAdminsRepository } from '../repositories/listUserAdmins.repo';
import { 
  ListUserAdminsResponse, 
  ListUserAdminsQueryParams,
  ListUserAdminsParams,
  UserAdminRecord 
} from '../dtos/listUserAdmins.dto';

const FUNCTION_NAME = 'ListUserAdminsService';

/**
 * Service para manejar la lógica de negocio de listar usuarios administradores
 */
export class ListUserAdminsService {
  private repository: ListUserAdminsRepository;

  constructor() {
    this.repository = new ListUserAdminsRepository();
  }

  /**
   * Procesa los parámetros de consulta y obtiene la lista de usuarios administradores
   */
  async getUserAdmins(queryParams: ListUserAdminsQueryParams): Promise<ListUserAdminsResponse> {
    try {
      // Procesar y validar parámetros
      const params = this.processQueryParams(queryParams);

      // Obtener usuarios desde el repository
      const users: UserAdminRecord[] = await this.repository.getUserAdmins(params);

      // Calcular información de paginación
      const totalItems = users.length > 0 ? users[0].total_count : 0;
      const totalPages = Math.ceil(totalItems / params.pageSize);

      const response: ListUserAdminsResponse = {
        items: users,
        pagination: {
          page: params.page,
          pageSize: params.pageSize,
          totalCount: totalItems,
          totalPages,
          hasNext: params.page < totalPages,
          hasPrevious: params.page > 1,
        },
       
      };


      return response;

    } catch (error) {

      throw new Error('Error al obtener los usuarios administradores');
    }
  }

  /**
   * Procesa y valida los parámetros de consulta
   */
  private processQueryParams(queryParams: ListUserAdminsQueryParams): ListUserAdminsParams {
    // Procesar búsqueda por username
    const searchUsername = queryParams.search && queryParams.search.trim() !== '' 
      ? queryParams.search.trim() 
      : null;

    // Procesar página (mínimo 1)
    const page = Math.max(1, parseInt(queryParams.page || '1') || 1);

    // Procesar tamaño de página (entre 1 y 100, por defecto 10)
    const pageSize = Math.min(100, Math.max(1, parseInt(queryParams.limit || '10') || 10));

    // Procesar IDs de roles (formato: "2,3,4")
    let roleIds: number[] | null = null;
    if (queryParams.roleId && queryParams.roleId.trim() !== '') {
      try {
        roleIds = queryParams.roleId
          .split(',')
          .map(id => parseInt(id.trim()))
          .filter(id => !isNaN(id) && id > 0);
        
        // Si no hay IDs válidos, setear como null
        if (roleIds.length === 0) {
          roleIds = null;
        }
      } catch (error) {
        roleIds = null;
      }
    }

    return {
      searchUsername,
      page,
      pageSize,
      roleIds,
    };
  }
} 