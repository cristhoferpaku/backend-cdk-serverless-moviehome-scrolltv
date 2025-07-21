import { CreateMovieRepository } from '../repositories/createMovie.repo';
import {
  CreateMovieRequest,
  CreateMovieResponse
} from '../dtos/createMovie.dto';

const FUNCTION_NAME = 'CreateMovieService';

export class CreateMovieService {
  private repository: CreateMovieRepository;

  constructor() {
    this.repository = new CreateMovieRepository();
  }

  async createMovie(data: CreateMovieRequest): Promise<CreateMovieResponse> {
    try {
      this.validate(data);

      const dbResult = await this.repository.createMovie(data);

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

  private validate(data: CreateMovieRequest): void {
    if (!data.title || data.title.trim().length === 0) {
      throw new Error('El nombre de la pelicula es requerido');
    }

    if (!data.description || data.description.trim().length === 0) {
      throw new Error('La descripcion de la pelicula es requerido');
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

    if (!data.duration_mins || data.duration_mins <= 0) {
      throw new Error('la duracion es requerido');
    }

    if (!data.cover_image || data.cover_image.trim().length === 0) {
      throw new Error('La imagen de la portada es requerido');
    }

    if (!data.video_url || data.video_url.trim().length === 0) {
      throw new Error('El url de la pelicula es requerido');
    }

    if (!data.publish_platform_1 && !data.publish_platform_2) {
      throw new Error('Al menos una plataforma debe estar habilitada');
    }
  }
}
