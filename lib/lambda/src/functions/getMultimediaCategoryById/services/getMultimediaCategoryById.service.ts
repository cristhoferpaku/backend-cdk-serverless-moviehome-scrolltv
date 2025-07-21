import { GetMultimediaCategoriesByIdRepository } from '../repositories/getMultimediaCategoryById.repo';
import {
  GetMultimediaCategoriesByIdRequest,
  GetMultimediaCategoriesByIdResponse
} from '../dtos/getMultimediaCategoryById.dto';

const FUNCTION_NAME = 'GetMultimediaCategoriesByIdService';

export class GetMultimediaCategoriesByIdService {
  private repository = new GetMultimediaCategoriesByIdRepository();

  async getMultimediaCategoriesById(request: GetMultimediaCategoriesByIdRequest): Promise<GetMultimediaCategoriesByIdResponse> {
    try {
      if (!request.id || request.id <= 0) {
        throw new Error('El ID es inválido');
      }


      const dbResult = await this.repository.getMultimediaCategoriesById(request.id);

      if (dbResult.success) {
        return {
          success: true,
          message: dbResult.message,
          data: {
            id: dbResult.id,
            name: dbResult.name,
            status: dbResult.status,
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
