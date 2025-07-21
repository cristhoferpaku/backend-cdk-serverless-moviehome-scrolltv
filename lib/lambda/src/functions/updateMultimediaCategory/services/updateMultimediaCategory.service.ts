import {
    UpdateMultimediaCategoriesRequest,
    UpdateMultimediaCategoriesResponse
  } from '../dtos/updateMultimediaCategory.dto';
  import { UpdateMultimediaCategoriesRepository } from '../repositories/updateMultimediaCategory.repo';
  
  const FUNCTION_NAME = 'UpdateMultimediaCategoriesService';
  
  export class UpdateMultimediaCategoriesService {
    private repository = new UpdateMultimediaCategoriesRepository();
  
    async updateMultimediaCategories(id: number, data: UpdateMultimediaCategoriesRequest): Promise<UpdateMultimediaCategoriesResponse> {
      try {
        if (!id || id <= 0) throw new Error('ID inválido');
        if (!data || Object.keys(data).length === 0) throw new Error('No se proporcionaron datos a actualizar');
        const result = await this.repository.updateMultimediaCategories(id, data);
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
  