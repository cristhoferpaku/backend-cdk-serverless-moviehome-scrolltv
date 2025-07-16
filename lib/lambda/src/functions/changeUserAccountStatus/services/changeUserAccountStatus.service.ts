import { ChangeUserAccountStatusRepository } from '../repositories/changeUserAccountStatus.repo';
import {
  ChangeUserAccountStatusRequest,
  ChangeUserAccountStatusResponse
} from '../dtos/changeUserAccountStatus.dto';


export class ChangeUserAccountStatusService {
  private repository = new ChangeUserAccountStatusRepository();

  async changeStatus(data: ChangeUserAccountStatusRequest): Promise<ChangeUserAccountStatusResponse> {
    try {
      this.validate(data);

      const dbResult = await this.repository.changeStatus(data.id, data.status);

      if (dbResult.success) {
        return {
          success: true,
          message: dbResult.message,
          data: {
            id: dbResult.id!,
            username: dbResult.username!,
            status: dbResult.status!
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

  private validate(data: ChangeUserAccountStatusRequest): void {
    if (!data.id || data.id <= 0) {
      throw new Error('El ID del usuario es inválido');
    }

    if (![0, 1, 2].includes(data.status)) {
      throw new Error('El estado debe ser 0 (inactivo), 1 (activo) o 2 (suspendido)');
    }
  }
}
