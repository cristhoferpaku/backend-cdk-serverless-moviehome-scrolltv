import { DeleteCollectionsRepository } from '../repositories/deleteCollection.repo';
import {
  DeleteCollectionsRequest,
  DeleteCollectionsResponse
} from '../dtos/deleteCollection.dto';

const FUNCTION_NAME = 'DeleteCollectionsService';

export class DeleteCollectionsService {
  private repository = new DeleteCollectionsRepository();

  async deleteCollections(data: DeleteCollectionsRequest): Promise<DeleteCollectionsResponse> {
    try {
      if (!data.id || data.id <= 0) {
        throw new Error('El ID de la colección es inválido');
      }

      const result = await this.repository.deleteCollections(data.id);

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
