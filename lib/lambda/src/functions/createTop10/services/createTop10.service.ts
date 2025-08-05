import { CreateTop10Repository } from '../repositories/createTop10.repo';
import { CreateTop10Request, CreateTop10Response } from '../dtos/createTop10.dto';

const FUNCTION_NAME = 'CreateTop10Service';

export class CreateTop10Service {
  private repository: CreateTop10Repository;

  constructor() {
    this.repository = new CreateTop10Repository();
  }

  async createTop10(data: CreateTop10Request): Promise<CreateTop10Response> {
    try {
 // Validar datos
      this.validateData(data);
      
      // Crear el elemento top10
      const result = await this.repository.createTop10(data);
      
      return result;
    } catch (error) {
      throw error;
    }
  }

  private validateData(data: CreateTop10Request): void {
    if (!data.contend_id || data.contend_id <= 0) {
      throw new Error('El ID del contenido es obligatorio y debe ser un número positivo');
    }

    if (!data.section_id || data.section_id <= 0) {
      throw new Error('El ID de la sección es obligatorio y debe ser un número positivo');
    }

    if (!data.top_number || data.top_number <= 0) {
      throw new Error('El número de top es obligatorio y debe ser un número positivo');
    }

  }
}