import { GetLiveTvsRepository } from '../repositories/getAllLiveTv.repo';
import { GetLiveTvsResponse } from '../dtos/getAllLiveTv.dto';

export class GetLiveTvsService {
  private repository: GetLiveTvsRepository;
  private readonly serviceName = 'GetLiveTvsService';

  constructor() {
    this.repository = new GetLiveTvsRepository();
  }

  /**
   * Obtiene todas las plataformas disponibles
   */ 
  async getAllLiveTvs(): Promise<GetLiveTvsResponse> {
    try {
      const liveTvs = await this.repository.getAllLiveTvs();
      const response: GetLiveTvsResponse = {
        items: liveTvs,
        total: liveTvs.length,  
        message: `Se encontraron ${liveTvs.length} live tv(s) disponible(s)`
      };
      return response;

    } catch (error) {
      throw error;
    }
  }
} 