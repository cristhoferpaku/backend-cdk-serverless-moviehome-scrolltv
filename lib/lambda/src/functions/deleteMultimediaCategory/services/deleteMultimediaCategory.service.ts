import { DeleteMultimediaCategoriesRepository } from '../repositories/deleteMultimediaCategory.repo';
import {
  DeleteMultimediaCategoriesRequest,
  DeleteMultimediaCategoriesResponse
} from '../dtos/deleteMultimediaCategory.dto';

const FUNCTION_NAME = 'DeleteMultimediaCategoriesService';

export class DeleteMultimediaCategoriesService {
  private repository = new DeleteMultimediaCategoriesRepository();

  async deleteMultimediaCategories(data: DeleteMultimediaCategoriesRequest): Promise<DeleteMultimediaCategoriesResponse> {
    try {
      if (!data.id || data.id <= 0) {
        throw new Error('El ID de la categoria es inválido');
      }

      const result = await this.repository.deleteMultimediaCategories(data.id);

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
