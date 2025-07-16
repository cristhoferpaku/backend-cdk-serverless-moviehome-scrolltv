import {
    UpdateResourceRequest,
    UpdateResourceResponse
  } from '../dtos/updateResource.dto';
  import { UpdateResourceRepository } from '../repositories/updateResource.repo';
  
  const FUNCTION_NAME = 'UpdateResourceService';
  
  export class UpdateResourceService {
    private repository = new UpdateResourceRepository();
  
    async updateResource(id: number, data: UpdateResourceRequest): Promise<UpdateResourceResponse> {
      try {
        if (!id || id <= 0) throw new Error('ID inválido');
        if (!data || Object.keys(data).length === 0) throw new Error('No se proporcionaron datos a actualizar');
        const result = await this.repository.updateResource(id, data);
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
  