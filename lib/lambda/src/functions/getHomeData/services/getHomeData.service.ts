import { GetHomeRepository } from '../repositories/getHomeData.repo';
import { GetHomeResponse  } from '../dtos/getHomeData.dto';

export class GetHomeService {
  private repository: GetHomeRepository;
  private readonly serviceName = 'GetHomeService';

  constructor() {
    this.repository = new GetHomeRepository();
  }

  /**
   * Obtiene todos los Home disponibles
   */
  async getAllHome(sectionId: number): Promise<GetHomeResponse> {
    try {

       const data = await this.repository.getAllHome(sectionId);
    

     return {
        data,
        message: 'Datos de home obtenidos correctamente',
      };
    } catch (error) {
      throw error;
    }
  }
} 