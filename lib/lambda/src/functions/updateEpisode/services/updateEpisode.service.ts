import {
    UpdateEpisodeRequest,
    UpdateEpisodeResponse
  } from '../dtos/updateEpisode.dto';
  import { UpdateEpisodeRepository } from '../repositories/updateEpisode.repo';
  
  const FUNCTION_NAME = 'UpdateEpisodeService';
  
  export class UpdateEpisodeService {
    private repository = new UpdateEpisodeRepository();
  
    async updateEpisode(id: number, data: UpdateEpisodeRequest): Promise<UpdateEpisodeResponse> {
      try {
        if (!id || id <= 0) throw new Error('ID inválido');
        if (!data || Object.keys(data).length === 0) throw new Error('No se proporcionaron datos a actualizar');
        const result = await this.repository.updateEpisode(id, data);
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
  