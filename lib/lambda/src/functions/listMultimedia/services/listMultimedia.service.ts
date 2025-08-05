import {
    ListMultimediaParams,
    ListMultimediaQueryParams,
    ListMultimediaResponse,
    MultimediaRecord
  } from '../dtos/listMultimedia.dto';
  import { ListMultimediaRepository } from '../repositories/listMultimedia.repo';
  
  const FUNCTION_NAME = 'ListMultimediaService';
  
  export class ListMultimediaService {
    private repository = new ListMultimediaRepository();
  
    async getMultimedia(queryParams: ListMultimediaQueryParams): Promise<ListMultimediaResponse> {
      try {
        const params = this.processQueryParams(queryParams);
  
        const Multimedia: MultimediaRecord[] = await this.repository.getMultimedia(params);
        const totalItems = Multimedia.length > 0 ? Multimedia[0].total_count : 0;
        const totalPages = Math.ceil(totalItems / params.limit);
  
        return {
          items: Multimedia,
          pagination: {
            page: params.page,
            totalPages,
            totalCount: totalItems,
            pageSize: params.limit,
            hasNext: params.page < totalPages,
            hasPrevious: params.page > 1,
          }
        };
      } catch (error) {
        console.error('Error getting multimedia:', error);
        throw new Error('Error al obtener la multimedia');
      }
    }
  
    private processQueryParams(query: ListMultimediaQueryParams): ListMultimediaParams {
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
  
      let type: string | null = null;
      if (query.type) {
        try {
          type = query.type;
        } catch {
          type = null;
        }
      }
  
      const page = Math.max(1, parseInt(query.page || '1') || 1);
      const limit = Math.min(100, Math.max(1, parseInt(query.limit || '10') || 10));
  
      return { search, status, type , page, limit };
    }
  }
  