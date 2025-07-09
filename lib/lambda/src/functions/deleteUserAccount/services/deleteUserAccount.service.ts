import { DeleteUserAccountRepository } from '../repositories/deleteUserAccount.repo';
import {
  DeleteUserAccountRequest,
  DeleteUserAccountResponse
} from '../dtos/deleteUserAccount.dto';
import { logError, logInfo } from '../../../../layers/utils/nodejs/utils';

const FUNCTION_NAME = 'DeleteUserAccountService';

export class DeleteUserAccountService {
  private repository = new DeleteUserAccountRepository();

  async deleteUserAccount(data: DeleteUserAccountRequest): Promise<DeleteUserAccountResponse> {
    try {
      if (!data.id || data.id <= 0) {
        throw new Error('El ID del usuario es inválido');
      }

      logInfo(FUNCTION_NAME, 'Eliminando cuenta de usuario', { id: data.id });

      const result = await this.repository.deleteUserAccount(data.id);

      return {
        success: result.success,
        message: result.message
      };
    } catch (error) {
      return {
        success: false,
        message: error instanceof Error ? error.message : 'Error interno del servidor'
      };
    }
  }
}
