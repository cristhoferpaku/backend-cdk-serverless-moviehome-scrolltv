import { DeleteTop10Repository } from '../repositories/deleteTop10.repo';
import { DeleteTop10Response } from '../dtos/deleteTop10.dto';

const FUNCTION_NAME = 'DeleteTop10Service';

export class DeleteTop10Service {
  private repository: DeleteTop10Repository;

  constructor() {
    this.repository = new DeleteTop10Repository();
  }

  async deleteTop10(id: number): Promise<DeleteTop10Response> {
    try {

      // Validar ID
      this.validateId(id);
      
      // Eliminar el elemento top10
      const result = await this.repository.deleteTop10(id);
      
      return result;
    } catch (error) {
      throw error;
    }
  }

  private validateId(id: number): void {
    if (!id || isNaN(id) || id <= 0) {
      throw new Error('El ID es obligatorio y debe ser un número positivo');
    }
  }
}