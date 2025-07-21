import {
    ListMultimediaCategoriesParams,
    ListMultimediaCategoriesQueryParams,
    ListMultimediaCategoriesResponse,
    MultimediaCategoriesRecord
  } from '../dtos/listMultimediaCategories.dto';
  import { ListMultimediaCategoriesRepository } from '../repositories/listMultimediaCategories.repo';
  
  const FUNCTION_NAME = 'ListMultimediaCategoriesService';
  
  export class ListMultimediaCategoriesService {
    private repository = new ListMultimediaCategoriesRepository();
  
    async getMultimediaCategories(queryParams: ListMultimediaCategoriesQueryParams): Promise<ListMultimediaCategoriesResponse> {
      try {
        const params = this.processQueryParams(queryParams);
  
        const MultimediaCategories: MultimediaCategoriesRecord[] = await this.repository.getMultimediaCategories(params);
        const totalItems = MultimediaCategories.length > 0 ? MultimediaCategories[0].total_count : 0;
        const totalPages = Math.ceil(totalItems / params.pageSize);
  
        return {
          items: MultimediaCategories,
          pagination: {
            page: params.page,
            totalPages,
            totalCount: totalItems,
            pageSize: params.pageSize,
            hasNext: params.page < totalPages,
            hasPrevious: params.page > 1,
          }
        };
      } catch (error) {
        throw new Error('Error al obtener las colecciones');
      }
    }
  
    private processQueryParams(query: ListMultimediaCategoriesQueryParams): ListMultimediaCategoriesParams {
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
      const pageSize = Math.min(100, Math.max(1, parseInt(query.limit || '10') || 10));
  
      return { search, status, page, pageSize };
    }
  }
  