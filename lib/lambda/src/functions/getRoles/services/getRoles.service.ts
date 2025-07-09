import { GetRolesRepository } from '../repositories/getRoles.repo';
import { GetRolesResponse } from '../dtos/getRoles.dto';
import { logInfo, logError } from '../../../../layers/utils/nodejs/utils';

export class GetRolesService {
  private repository: GetRolesRepository;
  private readonly serviceName = 'GetRolesService';

  constructor() {
    this.repository = new GetRolesRepository();
  }

  /**
   * Obtiene todos los roles disponibles
   */
  async getAllRoles(): Promise<GetRolesResponse> {
    try {
      logInfo(this.serviceName, 'Obteniendo todos los roles');

      const roles = await this.repository.getAllRoles();
      
      logInfo(this.serviceName, 'Roles obtenidos exitosamente', { 
        total: roles.length 
      });

      const response: GetRolesResponse = {
        items: roles,
        message: `Se encontraron ${roles.length} rol(es) disponible(s)`
      };

      return response;

    } catch (error) {
      logError(this.serviceName, error instanceof Error ? error : 'Error desconocido');
      throw error;
    }
  }
} 