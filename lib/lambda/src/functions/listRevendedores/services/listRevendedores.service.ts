import { ListRevendedoresRepository } from '../repositories/listRevendedores.repo';
import { ListRevendedoresRequest, ListRevendedoresResponse, RevendedoresItem,ListRevendedoresQueryParams } from '../dtos/listRevendedores.dto';

export class ListRevendedoresService {
  private repository: ListRevendedoresRepository;

  constructor() {
    this.repository = new ListRevendedoresRepository();
  }

  async listRevendedores(queryParams: ListRevendedoresQueryParams, idUser: number): Promise<ListRevendedoresResponse> {
    try {
      const params = this.processQueryParams(queryParams);
  
        const resource: RevendedoresItem[] = await this.repository.listRevendedores(params, idUser);
        const totalItems = resource.length > 0 ? resource[0].total_count : 0;
        const totalPages = Math.ceil(totalItems / params.limit);
  
        return {
          items: resource,
          pagination: {
            page: params.page,
            pageSize: params.limit,
            totalCount: totalItems,
            totalPages,
            hasNext: params.page < totalPages,
            hasPrevious: params.page > 1,
          }
        }
      
    } catch (error) {
      console.error('Error en ListRevendedoresService.listRevendedores:', error);
      throw error;
    }
  }

    private processQueryParams(query: ListRevendedoresQueryParams): ListRevendedoresRequest {
      const search = query.search?.trim() || null;
  
      let status: number[] | null = null;
      if (query.status) {
        try {
          const statusArray = query.status
            .split(',')
            .map((v) => parseInt(v.trim()))
            .filter((n) => !isNaN(n));
          status = statusArray.length > 0 ? statusArray : null;
        } catch {
          status = null;
        }
      }
  
      const page = Math.max(1, parseInt(query.page || '1') || 1);
      const limit = Math.min(100, Math.max(1, parseInt(query.limit || '10') || 10));
  
      return { search, status, page, limit };
    }
}