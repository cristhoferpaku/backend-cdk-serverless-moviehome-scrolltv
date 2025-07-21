import { CreateCollectionsRepository } from '../repositories/createCollection.repo';
import {
  CreateCollectionsRequest,
  CreateCollectionsResponse
} from '../dtos/createCollection.dto';

const FUNCTION_NAME = 'CreateCollectionsService';

export class CreateCollectionsService {
  private repository: CreateCollectionsRepository;

  constructor() {
    this.repository = new CreateCollectionsRepository();
  }

  async createCollections(data: CreateCollectionsRequest): Promise<CreateCollectionsResponse> {
    try {
      this.validate(data);

      const dbResult = await this.repository.createCollections(data);

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

  private validate(data: CreateCollectionsRequest): void {
    if (!data.name || data.name.trim().length === 0) {
      throw new Error('El nombre de la colección es requerido');
    }

    if (!data.status || data.status < 0 || data.status > 1) {
      throw new Error('El estado debe ser 0 (inactivo) o 1 (activo)');
    }
  }
}
