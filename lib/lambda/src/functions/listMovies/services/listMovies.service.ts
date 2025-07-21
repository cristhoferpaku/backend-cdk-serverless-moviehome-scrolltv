import {
    ListMovieParams,
    ListMovieQueryParams,
    ListMovieResponse,
    MovieRecord
  } from '../dtos/listMovies.dto';
  import { ListMovieRepository } from '../repositories/listMovies.repo';
  
  const FUNCTION_NAME = 'ListMovieService';
  
  export class ListMovieService {
    private repository = new ListMovieRepository();
  
    async getMovie(queryParams: ListMovieQueryParams): Promise<ListMovieResponse> {
      try {
        const params = this.processQueryParams(queryParams);
  
        const Movie: MovieRecord[] = await this.repository.getMovie(params);
        const totalItems = Movie.length > 0 ? Movie[0].total_count : 0;
        const totalPages = Math.ceil(totalItems / params.limit);
  
        return {
          items: Movie,
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
  
    private processQueryParams(query: ListMovieQueryParams): ListMovieParams {
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
  