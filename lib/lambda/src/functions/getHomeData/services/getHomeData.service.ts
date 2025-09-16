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
  async getAllHome(sectionId: number, user_id : number): Promise<GetHomeResponse> {
    try {

       const data = await this.repository.getAllHome(sectionId, user_id);
     return {
        data,
        message: 'Datos de home obtenidos correctamente',
      };
    } catch (error) {
      throw error;
    }
  }
} 