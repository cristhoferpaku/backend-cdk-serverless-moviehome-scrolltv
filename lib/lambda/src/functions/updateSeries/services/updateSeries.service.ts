import {
    UpdateSerieRequest,
    UpdateSerieResponse
  } from '../dtos/updateSeries.dto';
  import { UpdateSerieRepository } from '../repositories/updateSeries.repo';
  
  const FUNCTION_NAME = 'UpdateSerieService';
  
  export class UpdateSerieService {
    private repository = new UpdateSerieRepository();
  
    async updateSerie(id: number, data: UpdateSerieRequest): Promise<UpdateSerieResponse> {
      try {
        if (!id || id <= 0) throw new Error('ID inválido');
        if (!data || Object.keys(data).length === 0) throw new Error('No se proporcionaron datos a actualizar');
        const result = await this.repository.updateSerie(id, data);
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
  