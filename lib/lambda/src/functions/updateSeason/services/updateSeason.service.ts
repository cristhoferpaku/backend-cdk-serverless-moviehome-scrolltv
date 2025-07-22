import {
    UpdateSeasonRequest,
    UpdateSeasonResponse
  } from '../dtos/updateSeason.dto';
  import { UpdateSeasonRepository } from '../repositories/updateSeason.repo';
  
  const FUNCTION_NAME = 'UpdateSeasonService';
  
  export class UpdateSeasonService {
    private repository = new UpdateSeasonRepository();
  
    async updateSeason(id: number, data: UpdateSeasonRequest): Promise<UpdateSeasonResponse> {
      try {
        if (!id || id <= 0) throw new Error('ID inválido');
        if (!data || Object.keys(data).length === 0) throw new Error('No se proporcionaron datos a actualizar');
        const result = await this.repository.updateSeason(id, data);
        if (!result.success) {
          return { success: false, message: result.message };
        }
        const { success, message, ...rest } = result;
        return {
          success: true,
          message,
          data: rest
        };
      } catch (error) {
        return {
          success: false,
          message: error instanceof Error ? error.message : 'Error interno del servidor'
        };
      }
    }
  }
  