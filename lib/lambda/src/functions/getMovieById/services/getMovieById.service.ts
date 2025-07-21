import { GetMovieByIdRepository } from '../repositories/getMovieById.repo';
import {
  GetMovieByIdRequest,
  GetMovieByIdResponse
} from '../dtos/getMovieById.dto';

const FUNCTION_NAME = 'GetMovieByIdService';

export class GetMovieByIdService {
  private repository = new GetMovieByIdRepository();

  async getMovieById(request: GetMovieByIdRequest): Promise<GetMovieByIdResponse> {
    try {
      if (!request.id || request.id <= 0) {
        throw new Error('El ID es inválido');
      }


      const dbResult = await this.repository.getMovieById(request.id);
      
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
