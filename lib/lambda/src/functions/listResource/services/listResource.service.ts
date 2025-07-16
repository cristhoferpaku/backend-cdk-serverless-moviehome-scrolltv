import { ListResourceRepository } from '../repositories/listResource.repo';
import { ListResourceRequest, ListResourceResponse, ResourceItem,ListResourceQueryParams } from '../dtos/listResource.dto';

export class ListResourceService {
  private repository: ListResourceRepository;

  constructor() {
    this.repository = new ListResourceRepository();
  }

  async listResource(queryParams: ListResourceQueryParams): Promise<ListResourceResponse> {
    try {
      const params = this.processQueryParams(queryParams);
  
        const resource: ResourceItem[] = await this.repository.listResource(params);
        const totalItems = resource.length > 0 ? resource[0].total_count : 0;
        const totalPages = Math.ceil(totalItems / params.limit);
  
        return {
          items: resource,
          pagination: {
            currentPage: params.page,
            totalPages,
            totalItems,
            itemsPerPage: params.limit,
            hasNextPage: params.page < totalPages,
            hasPreviousPage: params.page > 1,
          }
        }
      
    } catch (error) {
      console.error('Error en ListResourceService.listResource:', error);
      throw error;
    }
  }

    private processQueryParams(query: ListResourceQueryParams): ListResourceRequest {
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