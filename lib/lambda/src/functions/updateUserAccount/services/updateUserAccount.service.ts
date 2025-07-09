import {
    UpdateUserAccountRequest,
    UpdateUserAccountResponse
  } from '../dtos/updateUserAccount.dto';
  import { UpdateUserAccountRepository } from '../repositories/updateUserAccount.repo';
  import { logError, logInfo } from '../../../../layers/utils/nodejs/utils';
  
  const FUNCTION_NAME = 'UpdateUserAccountService';
  
  export class UpdateUserAccountService {
    private repository = new UpdateUserAccountRepository();
  
    async updateUserAccount(id: number, data: UpdateUserAccountRequest): Promise<UpdateUserAccountResponse> {
      try {
        if (!id || id <= 0) throw new Error('ID inválido');
        if (!data || Object.keys(data).length === 0) throw new Error('No se proporcionaron datos a actualizar');
  
        logInfo(FUNCTION_NAME, 'Iniciando actualización de cuenta de usuario', { id, data });
  
        const result = await this.repository.updateUserAccount(id, data);
  
        if (!result.success) {
          return { success: false, message: result.message };
        }
  
        const { success, message, ...rest } = result;
  
        return {
          success: true,
          message,
          data: rest
        };
      } catch (error) {
        return {
          success: false,
          message: error instanceof Error ? error.message : 'Error interno del servidor'
        };
      }
    }
  }
  