import { ListPackageSellerRepository } from '../repositories/listPackageSeller.repo';
import { 
  ListPackageSellerRequest, 
  ListPackageSellerResponse, 
  PackageSellerItem 
} from '../dtos/listPackageSeller.dto';
import { logInfo, logError } from '../../../../layers/utils/nodejs/utils';

export class ListPackageSellerService {
  private repository: ListPackageSellerRepository;
  private readonly serviceName = 'ListPackageSellerService';

  constructor() {
    this.repository = new ListPackageSellerRepository();
  }

  async listPackageSeller(requestData: ListPackageSellerRequest): Promise<ListPackageSellerResponse> {
    try {
      logInfo(this.serviceName, 'Iniciando listado de paquetes vendedor', {
        search: requestData.search,
        page: requestData.page,
        pageSize: requestData.pageSize
      });
      
      // Validaciones y valores por defecto
      const page = Math.max(1, requestData.page || 1);
      const pageSize = Math.min(100, Math.max(1, requestData.pageSize || 10)); // Máximo 100 elementos por página
      const searchName = requestData.search && requestData.search.trim() !== '' ? requestData.search.trim() : undefined;

      // Validar parámetros de paginación
      this.validatePaginationParams(page, pageSize);

      // Ejecutar consulta usando el stored procedure
      const result = await this.repository.listPackageSeller(
        searchName,
        page,
        pageSize
      );

      // Procesar resultados
      const items: PackageSellerItem[] = result.map(row => ({
        id: row.id,
        name: row.name,
        credit: row.credit,
        platformId: row.platform_id,
        platformName: row.platform_name,
        packageTypeId: row.package_type_id,
        packageTypeName: row.package_type_name,
        status: row.status,
        createdAt: row.created_at.toISOString(),
        updatedAt: row.updated_at.toISOString()
      }));

      // Obtener total de registros (será 0 si no hay resultados)
      const totalCount = result.length > 0 ? Number(result[0].total_count) : 0;
      const totalPages = Math.ceil(totalCount / pageSize);

      const response: ListPackageSellerResponse = {
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

      logInfo(this.serviceName, 'Listado de paquetes vendedor completado', {
        itemsCount: items.length,
        totalCount,
        page,
        totalPages,
        search: searchName
      });
      
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

  /**
   * Valida los parámetros de paginación
   */
  private validatePaginationParams(page: number, pageSize: number): void {
    if (page < 1) {
      throw new Error('El número de página debe ser mayor a 0');
    }

    if (pageSize < 1) {
      throw new Error('El tamaño de página debe ser mayor a 0');
    }

    if (pageSize > 100) {
      throw new Error('El tamaño de página no puede ser mayor a 100');
    }
  }
} 