import { GetCastMemberByIdRepository } from '../repositories/getCastMemberById.repo';
import {
  GetCastMemberByIdRequest,
  GetCastMemberByIdResponse
} from '../dtos/getCastMemberById.dto';

const FUNCTION_NAME = 'GetCastMemberByIdService';

export class GetCastMemberByIdService {
  private repository = new GetCastMemberByIdRepository();

  async getCastMemberById(request: GetCastMemberByIdRequest): Promise<GetCastMemberByIdResponse> {
    try {
      if (!request.id || request.id <= 0) {
        throw new Error('El ID es inválido');
      }


      const dbResult = await this.repository.getCastMemberById(request.id);

      if (dbResult.success) {
        return {
          success: true,
          message: dbResult.message,
          data: {
            id: dbResult.id,
            name: dbResult.name,
            photo: dbResult.photo,
            created_at: dbResult.created_at,
            updated_at: dbResult.updated_at
          }
        };
      }

      return { success: false, message: dbResult.message };
    } catch (error) {
      return {
        success: false,
        message: error instanceof Error ? error.message : 'Error interno del servidor'
      };
    }
  }
}
