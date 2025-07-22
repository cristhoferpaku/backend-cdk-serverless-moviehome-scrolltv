import {
    ListSeasonParams,
    ListSeasonQueryParams,
    ListSeasonResponse,
    SeasonRecord
  } from '../dtos/listSeasons.dto';
  import { ListSeasonRepository } from '../repositories/listSeasons.repo';
  
  const FUNCTION_NAME = 'ListSeasonService';
  
  export class ListSeasonService {
    private repository = new ListSeasonRepository();
  
    async getSeason(queryParams: ListSeasonQueryParams): Promise<ListSeasonResponse> {
      try {
        const params = this.processQueryParams(queryParams);
  
        const Season: SeasonRecord[] = await this.repository.getSeason(params);
        return {
          items: Season,

        };
      } catch (error) {
        throw new Error('Error al obtener las temporadas');
      }
    }
  
    private processQueryParams(query: ListSeasonQueryParams): ListSeasonParams {
  
      const serie_id = Math.max(1, query.serie_id || 1);
  
      return { serie_id };
    }
  }
  
  export default ListSeasonService;