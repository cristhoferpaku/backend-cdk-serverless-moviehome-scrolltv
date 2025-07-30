import { CreateEpisodeRepository } from '../repositories/createEpisode.repo';
import {
  CreateEpisodeRequest,
  CreateEpisodeResponse
} from '../dtos/createEpisode.dto';

const FUNCTION_NAME = 'CreateEpisodeService';

export class CreateEpisodeService {
  private repository: CreateEpisodeRepository;

  constructor() {
    this.repository = new CreateEpisodeRepository();
  }

  async createEpisode(data: CreateEpisodeRequest): Promise<CreateEpisodeResponse> {
    try {
      this.validate(data);

      const dbResult = await this.repository.createEpisode(data);

      if (dbResult.success) {
        const { success, message, ...rest } = dbResult;
        return {
         success: true,
         message,
         data: rest
        };
      }

      return {
        success: false,
        message: dbResult.message
      };

    } catch (error) {
     
      return {
        success: false,
        message: error instanceof Error ? error.message : 'Error interno del servidor'
      };
    }
  }

  private validate(data: CreateEpisodeRequest): void {


    if (!data.season_id || data.season_id <= 0) {
      throw new Error('El id de la temporada es requerido');
    }


  }
}
