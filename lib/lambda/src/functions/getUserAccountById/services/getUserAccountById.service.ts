import { GetUserAccountByIdRepository } from '../repositories/getUserAccountById.repo';
import {
  GetUserAccountByIdRequest,
  GetUserAccountByIdResponse
} from '../dtos/getUserAccountById.dto';
import { logError, logInfo } from '../../../../layers/utils/nodejs/utils';

const FUNCTION_NAME = 'GetUserAccountByIdService';

export class GetUserAccountByIdService {
  private repository = new GetUserAccountByIdRepository();

  async getUserAccountById(request: GetUserAccountByIdRequest): Promise<GetUserAccountByIdResponse> {
    try {
      if (!request.id || request.id <= 0) {
        throw new Error('El ID del usuario es inválido');
      }

      logInfo(FUNCTION_NAME, 'Consultando cuenta de usuario', { id: request.id });

      const dbResult = await this.repository.getUserAccountById(request.id);

      if (dbResult.success) {
        return {
          success: true,
          message: dbResult.message,
          data: {
            id: dbResult.id,
            username: dbResult.username,
            platform_id: dbResult.platform_id,
            platform_name: dbResult.platform_name,
            package_user_id: dbResult.package_user_id,
            package_user_name: dbResult.package_user_name,
            status: dbResult.status,
            service_started: dbResult.service_started,
            start_date: dbResult.start_date,
            expiration_date: dbResult.expiration_date,
            can_change_package: dbResult.can_change_package,
            created_at: dbResult.created_at,
            updated_at: dbResult.updated_at
          }
        };
      }

      return { success: false, message: dbResult.message };
    } catch (error) {
      return {
        success: false,
        message: error instanceof Error ? error.message : 'Error interno del servidor'
      };
    }
  }
}
