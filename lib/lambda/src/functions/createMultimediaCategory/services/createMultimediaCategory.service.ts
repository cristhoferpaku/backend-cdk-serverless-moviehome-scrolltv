import { CreateMultimediaCategoriesRepository } from '../repositories/createMultimediaCategory.repo';
import {
  CreateMultimediaCategoriesRequest,
  CreateMultimediaCategoriesResponse
} from '../dtos/createMultimediaCategory.dto';

const FUNCTION_NAME = 'CreateMultimediaCategoriesService';

export class CreateMultimediaCategoriesService {
  private repository: CreateMultimediaCategoriesRepository;

  constructor() {
    this.repository = new CreateMultimediaCategoriesRepository();
  }

  async createMultimediaCategories(data: CreateMultimediaCategoriesRequest): Promise<CreateMultimediaCategoriesResponse> {
    try {
      this.validate(data);

      const dbResult = await this.repository.createMultimediaCategories(data);

      if (dbResult.success) {
        return {
          success: true,
          message: dbResult.message,
          data: {
            id: dbResult.id,
            name: dbResult.name,
            status: dbResult.status,
            created_at: dbResult.created_at,
            updated_at: dbResult.updated_at
          }
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

  private validate(data: CreateMultimediaCategoriesRequest): void {
    if (!data.name || data.name.trim().length === 0) {
      throw new Error('El nombre de la categoria es requerido');
    }

    if (!data.status || data.status < 0 || data.status > 1) {
      throw new Error('El estado debe ser 0 (inactivo) o 1 (activo)');
    }
  }
}
