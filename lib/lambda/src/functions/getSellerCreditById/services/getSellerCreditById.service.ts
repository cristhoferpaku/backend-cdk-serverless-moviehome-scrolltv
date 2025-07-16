import { GetSellerCreditByIdRepository } from '../repositories/getSellerCreditById.repo';
import { GetCredit,GetSellerCreditByIdResponse } from '../dtos/getSellerCreditById.dto';

export class GetSellerCreditByIdService {
  private repository: GetSellerCreditByIdRepository;
  private readonly serviceName = 'GetSellerCreditByIdService';

  constructor() {
    this.repository = new GetSellerCreditByIdRepository();
  }

  /**
   * Obtiene todas las plataformas disponibles
   */
  async getSellerCreditById( id : number): Promise<GetSellerCreditByIdResponse> {
    try {
      const creditResponse = await this.repository.getSellerCreditById(id);
      const response:   GetSellerCreditByIdResponse  = {
        credit: creditResponse,
        success: true,
        message: `Se encontroró el crédito`,
      };
      return response;

    } catch (error) {
      throw error;
    }
  }
} 