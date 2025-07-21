import { GetCollectionsByIdRepository } from '../repositories/getCollectionById.repo';
import {
  GetCollectionsByIdRequest,
  GetCollectionsByIdResponse
} from '../dtos/getCollectionById.dto';

const FUNCTION_NAME = 'GetCollectionsByIdService';

export class GetCollectionsByIdService {
  private repository = new GetCollectionsByIdRepository();

  async getCollectionsById(request: GetCollectionsByIdRequest): Promise<GetCollectionsByIdResponse> {
    try {
      if (!request.id || request.id <= 0) {
        throw new Error('El ID es inválido');
      }


      const dbResult = await this.repository.getCollectionsById(request.id);

      if (dbResult.success) {
        return {
          success: true,
          message: dbResult.message,
          data: {
            id: dbResult.id,
            name: dbResult.name,
            status: dbResult.status,
            section_id: dbResult.section_id,
            section_name: dbResult.section_name,
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
