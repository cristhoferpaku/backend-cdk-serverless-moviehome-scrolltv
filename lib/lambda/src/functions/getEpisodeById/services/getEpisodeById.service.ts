import { GetSeasonByIdRepository } from '../repositories/getEpisodeById.repo';
import {
  GetSeasonByIdRequest,
  GetSeasonByIdResponse
} from '../dtos/getEpisodeById.dto';

const FUNCTION_NAME = 'GetSeasonByIdService';

export class GetSeasonByIdService {
  private repository = new GetSeasonByIdRepository();

  async getSeasonById(request: GetSeasonByIdRequest): Promise<GetSeasonByIdResponse> {
    try {
      if (!request.id || request.id <= 0) {
        throw new Error('El ID es inválido');
      }


      const dbResult = await this.repository.getSeasonById(request.id);
      
      const {success, message, ...rest} = dbResult;

      if (success) {
        return {
          success: true,
          message,
          data: rest
        };
      }
      else{
        return {
          success: false,
          message,
        };
      }

    } catch (error) {
      return {
        success: false,
        message: error instanceof Error ? error.message : 'Error interno del servidor'
      };
    }
  }
}
