import {
    UpdateMovieRequest,
    UpdateMovieResponse
  } from '../dtos/updateMovie.dto';
  import { UpdateMovieRepository } from '../repositories/updateMovie.repo';
  
  const FUNCTION_NAME = 'UpdateMovieService';
  
  export class UpdateMovieService {
    private repository = new UpdateMovieRepository();
  
    async updateMovie(id: number, data: UpdateMovieRequest): Promise<UpdateMovieResponse> {
      try {
        if (!id || id <= 0) throw new Error('ID inválido');
        if (!data || Object.keys(data).length === 0) throw new Error('No se proporcionaron datos a actualizar');
        const result = await this.repository.updateMovie(id, data);
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
  