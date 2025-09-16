import { GetEpisodesFromSeasonRepository } from '../repositories/getEpisodesFromSeason.repo';
import {
  EpisodeData,
  GetEpisodesFromSeasonRequest,
  GetEpisodesFromSeasonResponse
} from '../dtos/getEpisodesFromSeason.dto';

const FUNCTION_NAME = 'GetEpisodesFromSeasonService';

export class GetEpisodesFromSeasonService {
  private repository = new GetEpisodesFromSeasonRepository();

  async getEpisodesFromSeason(request: GetEpisodesFromSeasonRequest): Promise<GetEpisodesFromSeasonResponse> {
    try {
      if (!request.season_id || request.season_id <= 0) {
        throw new Error('El season_id es inválido');
      }

      const episodes = await this.repository.getEpisodesFromSeason(request);
      const episodeData: EpisodeData[] = episodes.map(episode => ({
        episodeId: episode.id,
        episodeNumber: episode.episode_num,
        title: episode.title,
        description: episode.description,
        durationMins: episode.duration_mins,
        videoFile: episode.video_file
      }));
      if (episodes.length === 0) {
        throw new Error('No se encontraron episodios para la temporada');
      }
      return {
        success: true,
        message: 'Episodios obtenidos exitosamente',
        data: episodeData
      };

    } catch (error) {
      return {
        success: false,
        message: error instanceof Error ? error.message : 'Error interno del servidor'
      };
    }
  }
}
