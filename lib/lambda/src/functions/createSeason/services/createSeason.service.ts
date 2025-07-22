import { CreateSeasonRepository } from '../repositories/createSeason.repo';
import {
  CreateSeasonRequest,
  CreateSeasonResponse
} from '../dtos/createSeason.dto';

const FUNCTION_NAME = 'CreateSeasonService';

export class CreateSeasonService {
  private repository: CreateSeasonRepository;

  constructor() {
    this.repository = new CreateSeasonRepository();
  }

  async createSeason(data: CreateSeasonRequest): Promise<CreateSeasonResponse> {
    try {
      this.validate(data);

      const dbResult = await this.repository.createSeason(data);

      if (dbResult.success) {
        const { success, message, ...rest } = dbResult;
        return {
         success: true,
         message,
         data: rest
        };
      }

      return {
        success: false,
        message: dbResult.message
      };

    } catch (error) {
     
      return {
        success: false,
        message: error instanceof Error ? error.message : 'Error interno del servidor'
      };
    }
  }

  private validate(data: CreateSeasonRequest): void {


    if (!data.series_id || data.series_id <= 0) {
      throw new Error('El id de la serie es requerido');
    }

  }
}
