import { LogoutMobileRepository } from '../repositories/logoutMobile.repo';
import {
  LogoutMobileRequest,
  LogoutMobileResponse
} from '../dtos/logoutMobile.dto';

const FUNCTION_NAME = 'LogoutMobileService';

export class LogoutMobileService {
  private repository: LogoutMobileRepository;

  constructor() {
    this.repository = new LogoutMobileRepository();
  }

  async logoutUser(data: LogoutMobileRequest): Promise<LogoutMobileResponse> {
    try {
      this.validate(data);

      const dbResult = await this.repository.logoutUser(data);

      return {
        success: dbResult.success,
        message: dbResult.message
      };

    } catch (error) {
      return {
        success: false,
        message: error instanceof Error ? error.message : 'Error interno del servidor'
      };
    }
  }

  private validate(data: LogoutMobileRequest): void {
    if (!data.id_device || data.id_device.trim().length === 0) {
      throw new Error('El id_device es requerido');
    }
  }
}
