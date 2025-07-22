import { GetSerieByIdRepository } from '../repositories/getSeriesById.repo';
import {
  GetSerieByIdRequest,
  GetSerieByIdResponse
} from '../dtos/getSeriesById.dto';

const FUNCTION_NAME = 'GetSerieByIdService';

export class GetSerieByIdService {
  private repository = new GetSerieByIdRepository();

  async getSerieById(request: GetSerieByIdRequest): Promise<GetSerieByIdResponse> {
    try {
      if (!request.id || request.id <= 0) {
        throw new Error('El ID es inválido');
      }


      const dbResult = await this.repository.getSerieById(request.id);
      
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
