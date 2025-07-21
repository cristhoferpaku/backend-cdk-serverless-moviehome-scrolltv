import {
    ListCollectionsParams,
    ListCollectionsQueryParams,
    ListCollectionsResponse,
    CollectionsRecord
  } from '../dtos/listCollections.dto';
  import { ListCollectionsRepository } from '../repositories/listCollections.repo';
  
  const FUNCTION_NAME = 'ListCollectionsService';
  
  export class ListCollectionsService {
    private repository = new ListCollectionsRepository();
  
    async getCollections(queryParams: ListCollectionsQueryParams): Promise<ListCollectionsResponse> {
      try {
        const params = this.processQueryParams(queryParams);
  
        const collections: CollectionsRecord[] = await this.repository.getCollections(params);
        const totalItems = collections.length > 0 ? collections[0].total_count : 0;
        const totalPages = Math.ceil(totalItems / params.pageSize);
  
        return {
          items: collections,
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
  
    private processQueryParams(query: ListCollectionsQueryParams): ListCollectionsParams {
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
  