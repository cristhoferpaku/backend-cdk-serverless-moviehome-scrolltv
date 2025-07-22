import { CreateSerieRepository } from '../repositories/createSeries.repo';
import {
  CreateSerieRequest,
  CreateSerieResponse
} from '../dtos/createSeries.dto';

const FUNCTION_NAME = 'CreateSerieService';

export class CreateSerieService {
  private repository: CreateSerieRepository;

  constructor() {
    this.repository = new CreateSerieRepository();
  }

  async createSerie(data: CreateSerieRequest): Promise<CreateSerieResponse> {
    try {
      this.validate(data);

      const dbResult = await this.repository.createSerie(data);

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

  private validate(data: CreateSerieRequest): void {
    if (!data.title || data.title.trim().length === 0) {
      throw new Error('El nombre de la serie es requerido');
    }

    if (!data.description || data.description.trim().length === 0) {
      throw new Error('La descripcion de la serie es requerido');
    }

    if (!data.category_ids || data.category_ids.length === 0) {
      throw new Error('los id de las categorias son requeridos');
    }

    if (!data.section_id || data.section_id <= 0) {
      throw new Error('El id de la seccion es requerido');
    }

    if (!data.country_id || data.country_id <= 0) {
      throw new Error('El id del pais es requerido');
    }

    if (!data.collection_id || data.collection_id <= 0) {
      throw new Error('El id de la coleccion es requerido');
    }

    if (!data.publish_platform_1 && !data.publish_platform_2) {
      throw new Error('Al menos una plataforma debe estar habilitada');
    }
  }
}
