import { CreateUserAccountRepository } from '../repositories/createUserAccount.repo';
import {
  CreateUserAccountRequest,
  CreateUserAccountResponse
} from '../dtos/createUserAccount.dto';
import { logError, logInfo } from '../../../../layers/utils/nodejs/utils';

const FUNCTION_NAME = 'CreateUserAccountService';

export class CreateUserAccountService {
  private repository: CreateUserAccountRepository;

  constructor() {
    this.repository = new CreateUserAccountRepository();
  }

  async createUserAccount(data: CreateUserAccountRequest): Promise<CreateUserAccountResponse> {
    try {
      this.validate(data);

      logInfo(FUNCTION_NAME, 'Iniciando creación de cuenta de usuario', {
        username: data.username
      });

      const dbResult = await this.repository.createUserAccount(data);

      if (dbResult.success) {
        return {
          success: true,
          message: dbResult.message,
          data: {
            id: dbResult.id,
            username: dbResult.username,
            platform_id: dbResult.platform_id,
            package_user_id: dbResult.package_user_id,
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

      return {
        success: false,
        message: dbResult.message
      };

    } catch (error) {
      logError(FUNCTION_NAME, error instanceof Error ? error : 'Error desconocido', {
        userAccountData: {
          username: data.username,
          package_user_id: data.package_user_id,
          platform_id: data.platform_id,
          user_admin_id: data.user_admin_id
        }
      });
      return {
        success: false,
        message: error instanceof Error ? error.message : 'Error interno del servidor'
      };
    }
  }

  private validate(data: CreateUserAccountRequest): void {
    if (!data.username || data.username.trim().length === 0) {
      throw new Error('El nombre de usuario es requerido');
    }
    if (!data.password || data.password.trim().length < 6) {
      throw new Error('La contraseña debe tener al menos 6 caracteres');
    }
    if (!Number.isInteger(data.package_user_id) || data.package_user_id <= 0) {
      throw new Error('El paquete es inválido');
    }
    if (!Number.isInteger(data.platform_id) || data.platform_id <= 0) {
      throw new Error('La plataforma es inválida');
    }
    if (!Number.isInteger(data.user_admin_id) || data.user_admin_id <= 0) {
      throw new Error('El usuario administrador es inválido');
    }
  }
}
