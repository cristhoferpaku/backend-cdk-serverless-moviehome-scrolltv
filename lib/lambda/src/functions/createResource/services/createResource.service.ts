import { CreateResourceRepository } from '../repositories/createResource.repo';
import { CreateResourceRequest, CreateResourceResult } from '../dtos/createResource.dto';

export class CreateResourceService {
  private repository: CreateResourceRepository;
  constructor() {
    this.repository = new CreateResourceRepository(); 
  }

  async createResource(request: CreateResourceRequest): Promise<CreateResourceResult> {
    try {
      // Validaciones básicas
      if (!request.name || request.name.trim().length === 0) {
        return {
          success: false,
          message: 'El nombre del recurso es requerido'
        };
      }

      if (!request.platform_id) {
        return {
          success: false,
          message: 'La plataforma es requerida'
        };
      }

      // Llamar al stored procedure
      const result = await this.repository.createResource(request);

      if (!result.success) {
        return {
          success: false,
          message: result.message
        };
      }

      return {
        success: true,
        data: result,
        message: result.message
      };
    } catch (error) {
      console.error('Error en CreateResourceService:', error);
      return {
        success: false,
        message: 'Error interno del servidor'
      };
    }
  }
}