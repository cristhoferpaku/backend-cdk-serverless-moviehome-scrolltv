import { DeleteEpisodeRepository } from '../repositories/deleteEpisode.repo';
import {
  DeleteEpisodeRequest,
  DeleteEpisodeResponse
} from '../dtos/deleteEpisode.dto';

const FUNCTION_NAME = 'DeleteEpisodeService';

export class DeleteEpisodeService {
  private repository = new DeleteEpisodeRepository();

  async deleteEpisode(data: DeleteEpisodeRequest): Promise<DeleteEpisodeResponse> {
    try {
      if (!data.id || data.id <= 0) {
        throw new Error('El ID del episodio  es inválido');
      }

      const result = await this.repository.deleteEpisode(data.id);

      return {
        success: result.success,
        message: result.message
      };
    } catch (error) {
      return {
        success: false,
        message: error instanceof Error ? error.message : 'Error interno del servidor'
      };
    }
  }
}
