import {
    UpdateLiveTvRequest,
    UpdateLiveTvResponse
  } from '../dtos/updateLiveTv.dto';
  import { UpdateLiveTvRepository } from '../repositories/updateLiveTv.repo';
  
  const FUNCTION_NAME = 'UpdateLiveTvService';
  
  export class UpdateLiveTvService {
    private repository = new UpdateLiveTvRepository();
  
    async updateLiveTv(id: number, data: UpdateLiveTvRequest): Promise<UpdateLiveTvResponse> {
      try {
        if (!id || id <= 0) throw new Error('El ID del LiveTV es inválido');
        if (!data || Object.keys(data).length === 0) throw new Error('No se proporcionaron datos a actualizar para el LiveTV');
        const result = await this.repository.updateLiveTv(id, data);
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
  