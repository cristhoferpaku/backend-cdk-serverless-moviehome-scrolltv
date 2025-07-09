import { ListPackageTypesRepository } from '../repositories/listPackageTypes.repo';
import { ListPackageTypesRequest, ListPackageTypesResponse, PackageTypeItem } from '../dtos/listPackageTypes.dto';
  import { logError } from '../../../../layers/utils/nodejs/utils';

export class ListPackageTypesService {
  private repository: ListPackageTypesRepository;
  private readonly serviceName = 'ListPackageTypesService';

  constructor() {
    this.repository = new ListPackageTypesRepository();
  }

  async listPackageTypes(requestData: ListPackageTypesRequest): Promise<ListPackageTypesResponse> {
    try {
    
      // Validaciones y valores por defecto
      const page = Math.max(1, requestData.page || 1);
      const pageSize = Math.min(100, Math.max(1, requestData.pageSize || 10)); // Máximo 100 elementos por página
      const searchName = requestData.search && requestData.search.trim() !== '' ? requestData.search.trim() : undefined;

      // Validar parámetros de paginación
      this.validatePaginationParams(page, pageSize);

      // Ejecutar consulta usando el stored procedure
      const result = await this.repository.listPackageTypes(searchName, page, pageSize);

      // Procesar resultados
      const items: PackageTypeItem[] = result.map(row => ({
        id: row.id,
        name: row.name,
        status: row.status
      }));

      // Obtener total de registros (será 0 si no hay resultados)
      const totalCount = result.length > 0 ? Number(result[0].total_count) : 0;
      const totalPages = Math.ceil(totalCount / pageSize);

      const response: ListPackageTypesResponse = {
        items,
        pagination: {
          page,
          pageSize,
          totalCount,
          totalPages,
          hasNext: page < totalPages,
          hasPrevious: page > 1
        }
      };

     
      
      return response;
    } catch (error) {
      logError(this.serviceName, error instanceof Error ? error : 'Error desconocido', {
        search: requestData.search,
        page: requestData.page,
        pageSize: requestData.pageSize
      });
      throw error;
    }
  }

  private validatePaginationParams(page: number, pageSize: number): void {
    if (!Number.isInteger(page) || page < 1) {
      throw new Error('El número de página debe ser un entero positivo');
    }

    if (!Number.isInteger(pageSize) || pageSize < 1 || pageSize > 100) {
      throw new Error('El tamaño de página debe ser un entero entre 1 y 100');
    }

   
  }
} 