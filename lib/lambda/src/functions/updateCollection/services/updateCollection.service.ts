import {
    UpdateCollectionsRequest,
    UpdateCollectionsResponse
  } from '../dtos/updateCollection.dto';
  import { UpdateCollectionsRepository } from '../repositories/updateCollection.repo';
  
  const FUNCTION_NAME = 'UpdateCollectionsService';
  
  export class UpdateCollectionsService {
    private repository = new UpdateCollectionsRepository();
  
    async updateCollections(id: number, data: UpdateCollectionsRequest): Promise<UpdateCollectionsResponse> {
      try {
        if (!id || id <= 0) throw new Error('ID inválido');
        if (!data || Object.keys(data).length === 0) throw new Error('No se proporcionaron datos a actualizar');
        const result = await this.repository.updateCollections(id, data);
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
  