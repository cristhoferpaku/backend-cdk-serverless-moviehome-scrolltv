import { ListPackageTypesActiveRepository } from '../repositories/listPackageTypesActive.repo';
import { 
  ListPackageTypesActiveResponse, 
  PackageTypeActiveRecord 
} from '../dtos/listPackageTypesActive.dto';
import { logError, logInfo } from '../../../../layers/utils/nodejs/utils';

const FUNCTION_NAME = 'ListPackageTypesActiveService';

/**
 * Service para manejar la lógica de negocio de listar tipos de paquetes activos
 */
export class ListPackageTypesActiveService {
  private repository: ListPackageTypesActiveRepository;

  constructor() {
    this.repository = new ListPackageTypesActiveRepository();
  }

  /**
   * Obtiene todos los tipos de paquetes activos
   */
  async getActivePackageTypes(): Promise<ListPackageTypesActiveResponse> {
    try {
      logInfo(FUNCTION_NAME, 'Iniciando búsqueda de tipos de paquetes activos');

      const packageTypes: PackageTypeActiveRecord[] = await this.repository.getActivePackageTypes();

      const response: ListPackageTypesActiveResponse = {
        packageTypes,
        total: packageTypes.length
      };

      logInfo(FUNCTION_NAME, 'Tipos de paquetes activos obtenidos exitosamente', {
        total: response.total,
      });

      return response;

    } catch (error) {
      logError(FUNCTION_NAME, error instanceof Error ? error : new Error('Error desconocido'), {
        operation: 'getActivePackageTypes',
      });
      throw new Error('Error al obtener los tipos de paquetes activos');
    }
  }
} 