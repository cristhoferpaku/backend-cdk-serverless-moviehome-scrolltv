import {
  ListLiveTvRequest,
  ListLiveTvResponse,
  LiveTvChannel
} from '../dtos/listLiveTv.dto';
import { ListLiveTvRepository } from '../repositories/listLiveTv.repo';

const FUNCTION_NAME = 'ListLiveTvService';

export class ListLiveTvService {
  private repository = new ListLiveTvRepository();

  async listLiveTv(data: ListLiveTvRequest): Promise<ListLiveTvResponse> {
    try {
      // Validar datos
      this.validateData(data);
      
      const result = await this.repository.listLiveTv(data);
      
      const totalCount = result.length > 0 ? result[0].total_count : 0;
      const pageSize = data.page_size || 10;
      const currentPage = data.page || 1;
      const totalPages = Math.ceil(totalCount / pageSize);
      
      const liveTvChannels: LiveTvChannel[] = result.map(item => ({
        id: item.id,
        name: item.name,
        url: item.url,
        status: item.status,
        created_at: item.created_at,
        updated_at: item.updated_at
      }));
      
      return {
        items: liveTvChannels,
        pagination: {
          page: currentPage,
          pageSize: pageSize,
          totalCount: totalCount,
          totalPages: totalPages,
          hasNext: currentPage < totalPages,
          hasPrevious: currentPage > 1
        }
      };
    } catch (error) {
      console.error('Error en ListLiveTvService.listLiveTv:', error);
      throw error;
    }
  }
  
  private validateData(data: ListLiveTvRequest): void {
    if (data.search_name && data.search_name.length > 60) {
      throw new Error('El nombre de búsqueda no puede exceder los 60 caracteres');
    }
    
    if (data.page && data.page < 1) {
      throw new Error('El número de página debe ser mayor a 0');
    }
    
    if (data.page_size && (data.page_size < 1 || data.page_size > 100)) {
      throw new Error('El tamaño de página debe estar entre 1 y 100');
    }
  }
}