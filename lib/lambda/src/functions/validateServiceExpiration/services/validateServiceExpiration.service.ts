import { ValidateServiceExpirationRepository } from '../repositories/validateServiceExpiration.repo';
import {
  ValidateServiceExpirationRequest,
  ValidateServiceExpirationResponse
} from '../dtos/validateServiceExpiration.dto';

const FUNCTION_NAME = 'ValidateServiceExpirationService';

export class ValidateServiceExpirationService {
  private repository: ValidateServiceExpirationRepository;

  constructor() {
    this.repository = new ValidateServiceExpirationRepository();
  }

  async validateServiceExpiration(data: ValidateServiceExpirationRequest): Promise<ValidateServiceExpirationResponse> {
    try {
      this.validate(data);

      const dbResult = await this.repository.validateServiceExpiration(data);

      if (dbResult.success) {
        return {
          success: true,
          message: dbResult.message,
          data: {
            expiration_date: dbResult.expiration_date
          }
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

  private validate(data: ValidateServiceExpirationRequest): void {
    if (!data.user_id || data.user_id <= 0) {
      throw new Error('El ID de usuario es requerido y debe ser válido');
    }
  }
}
