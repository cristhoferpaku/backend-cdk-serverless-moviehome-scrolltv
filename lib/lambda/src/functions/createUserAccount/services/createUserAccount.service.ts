import * as bcrypt from 'bcryptjs';
import { CreateUserAccountRepository } from '../repositories/createUserAccount.repo';
import {
  CreateUserAccountRequest,
  CreateUserAccountResponse
} from '../dtos/createUserAccount.dto';

const FUNCTION_NAME = 'CreateUserAccountService';

export class CreateUserAccountService {
  private repository: CreateUserAccountRepository;

  constructor() {
    this.repository = new CreateUserAccountRepository();
  }

  async createUserAccount(data: CreateUserAccountRequest): Promise<CreateUserAccountResponse> {
    try {
      this.validate(data);

      // Hash de la contraseña
      const saltRounds = 12;
      const hashedPassword = await bcrypt.hash(data.password, saltRounds);
      
      // Crear una copia de los datos con la contraseña hasheada
      const dataWithHashedPassword = {
        ...data,
        password: hashedPassword
      };

      const dbResult = await this.repository.createUserAccount(dataWithHashedPassword);

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
    if (!data.password || data.password.trim().length === 0) {
      throw new Error('La contraseña es requerida');
    }
    
    // Validar que la contraseña sea segura
    if (!this.isValidPassword(data.password)) {
      throw new Error('La contraseña debe tener al menos 8 caracteres, incluir al menos una letra mayúscula, una minúscula, un número y un carácter especial');
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

  /**
   * Valida que la contraseña cumpla con los requisitos de seguridad
   */
  private isValidPassword(password: string): boolean {
    // Al menos 8 caracteres
    if (password.length < 8) return false;
    
    // Al menos una letra mayúscula
    if (!/[A-Z]/.test(password)) return false;
    
    // Al menos una letra minúscula
    if (!/[a-z]/.test(password)) return false;
    
    // Al menos un número
    if (!/\d/.test(password)) return false;
    
    // Al menos un carácter especial
    if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) return false;
    
    return true;
  }
}
