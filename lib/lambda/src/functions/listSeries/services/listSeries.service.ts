import {
    ListSerieParams,
    ListSerieQueryParams,
    ListSerieResponse,
    SerieRecord
  } from '../dtos/listSeries.dto';
  import { ListSerieRepository } from '../repositories/listSeries.repo';
  
  const FUNCTION_NAME = 'ListSerieService';
  
  export class ListSerieService {
    private repository = new ListSerieRepository();
  
    async getSerie(queryParams: ListSerieQueryParams): Promise<ListSerieResponse> {
      try {
        const params = this.processQueryParams(queryParams);
  
        const Serie: SerieRecord[] = await this.repository.getSerie(params);
        const totalItems = Serie.length > 0 ? Serie[0].total_count : 0;
        const totalPages = Math.ceil(totalItems / params.limit);
  
        return {
          items: Serie,
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
        throw new Error('Error al obtener las colecciones');
      }
    }
  
    private processQueryParams(query: ListSerieQueryParams): ListSerieParams {
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
  