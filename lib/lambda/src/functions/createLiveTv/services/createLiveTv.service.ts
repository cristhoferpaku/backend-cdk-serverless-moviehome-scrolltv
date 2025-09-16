import { CreateLiveTvRepository } from '../repositories/createLiveTv.repo';
import { CreateLiveTvRequest, CreateLiveTvResponse, LiveTvData } from '../dtos/createLiveTv.dto';

const FUNCTION_NAME = 'CreateLiveTvService';

export class CreateLiveTvService {
  private repository: CreateLiveTvRepository;

  constructor() {
    this.repository = new CreateLiveTvRepository();
  }

  async createLiveTv(data: CreateLiveTvRequest): Promise<CreateLiveTvResponse> {
    try {
      // Validar datos
      this.validateData(data);
      
      // Crear el canal de TV en vivo
      const result = await this.repository.createLiveTv(data);
      
      if (result.success) {
        const liveTvData: LiveTvData = {
          id: result.id,
          name: result.name,
          url: result.url,
          created_at: result.created_at,
          updated_at: result.updated_at
        };
        
        return {
          success: true,
          message: result.message,
          data: liveTvData
        };
      } else {
        return {
          success: false,
          message: result.message
        };
      }
    } catch (error) {
      throw error;
    }
  }

  private validateData(data: CreateLiveTvRequest): void {
    if (!data.name || data.name.trim().length === 0) {
      throw new Error('El nombre es obligatorio');
    }

    if (data.name.length > 60) {
      throw new Error('El nombre no puede exceder los 60 caracteres');
    }

    if (!data.url || data.url.trim().length === 0) {
      throw new Error('La URL es obligatoria');
    }

    if (data.url.length > 255) {
      throw new Error('La URL no puede exceder los 255 caracteres');
    }

    // Validación básica de formato URL
    const urlPattern = /^(https?:\/\/)([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;
    if (!urlPattern.test(data.url)) {
      throw new Error('La URL debe tener un formato válido');
    }
  }
}