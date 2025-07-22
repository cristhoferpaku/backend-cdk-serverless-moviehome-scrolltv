import { DeleteSerieRepository } from '../repositories/deleteSeason.repo';
import {
  DeleteSerieRequest,
  DeleteSerieResponse
} from '../dtos/deleteSeason.dto';

const FUNCTION_NAME = 'DeleteSerieService';

export class DeleteSerieService {
  private repository = new DeleteSerieRepository();

  async deleteSerie(data: DeleteSerieRequest): Promise<DeleteSerieResponse> {
    try {
      if (!data.id || data.id <= 0) {
        throw new Error('El ID de la serie es inválido');
      }

      const result = await this.repository.deleteSerie(data.id);

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
