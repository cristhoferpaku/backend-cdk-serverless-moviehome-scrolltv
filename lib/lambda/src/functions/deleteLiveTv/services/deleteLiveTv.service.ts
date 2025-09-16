import { DeleteLiveTvRepository } from '../repositories/deleteLiveTv.repo';
import {
  DeleteLiveTvRequest,
  DeleteLiveTvResponse
} from '../dtos/deleteLiveTv.dto';

const FUNCTION_NAME = 'DeleteLiveTvService';

export class DeleteLiveTvService {
  private repository = new DeleteLiveTvRepository();

  async deleteLiveTv(data: DeleteLiveTvRequest): Promise<DeleteLiveTvResponse> {
    try {
      if (!data.id || data.id <= 0) {
        throw new Error('El ID del LiveTV es inválido');
      }
      const result = await this.repository.deleteLiveTv(data.id);
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
