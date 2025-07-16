import { DeleteCastMemberRepository } from '../repositories/deleteCastMember.repo';
import {
  DeleteCastMemberRequest,
  DeleteCastMemberResponse
} from '../dtos/deleteCastMember.dto';

const FUNCTION_NAME = 'DeleteCastMemberService';

export class DeleteCastMemberService {
  private repository = new DeleteCastMemberRepository();

  async deleteCastMember(data: DeleteCastMemberRequest): Promise<DeleteCastMemberResponse> {
    try {
      if (!data.id || data.id <= 0) {
        throw new Error('El ID del usuario es inválido');
      }

      const result = await this.repository.deleteCastMember(data.id);

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
