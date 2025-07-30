import {
    ListSeasonParams,
    ListSeasonQueryParams,
    ListSeasonResponse,
    SeasonRecord
  } from '../dtos/listEpisodes.dto';
  import { ListSeasonRepository } from '../repositories/listEpisodes.repo';
  
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
        throw new Error('Error al obtener los episodios');
      }
    }
  
    private processQueryParams(query: ListSeasonQueryParams): ListSeasonParams {
  
      const season_id = Math.max(1, query.season_id || 1);
  
      return { season_id };
    }
  }
  
  export default ListSeasonService;