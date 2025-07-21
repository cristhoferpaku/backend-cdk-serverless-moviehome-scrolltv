import { DeleteMovieRepository } from '../repositories/deleteMovie.repo';
import {
  DeleteMovieRequest,
  DeleteMovieResponse
} from '../dtos/deleteMovie.dto';

const FUNCTION_NAME = 'DeleteMovieService';

export class DeleteMovieService {
  private repository = new DeleteMovieRepository();

  async deleteMovie(data: DeleteMovieRequest): Promise<DeleteMovieResponse> {
    try {
      if (!data.id || data.id <= 0) {
        throw new Error('El ID de la pelicula es inválido');
      }

      const result = await this.repository.deleteMovie(data.id);

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
