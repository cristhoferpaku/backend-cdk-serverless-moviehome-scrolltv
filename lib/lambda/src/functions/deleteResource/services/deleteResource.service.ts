import { DeleteResourceRepository } from '../repositories/deleteResource.repo';
import {
  DeleteResourceRequest,
  DeleteResourceResponse
} from '../dtos/deleteResource.dto';

const FUNCTION_NAME = 'DeleteResourceService';

export class DeleteResourceService {
  private repository = new DeleteResourceRepository();

  async deleteResource(data: DeleteResourceRequest): Promise<DeleteResourceResponse> {
    try {
      if (!data.id || data.id <= 0) {
        throw new Error('El ID del usuario es inválido');
      }
      const result = await this.repository.deleteResource(data.id);
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
