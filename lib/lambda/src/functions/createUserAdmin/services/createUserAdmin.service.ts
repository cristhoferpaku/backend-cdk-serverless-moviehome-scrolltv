import * as bcrypt from 'bcryptjs';
import { CreateUserAdminRepository } from '../repositories/createUserAdmin.repo';
import { CreateUserAdminRequest, CreateUserAdminResponse } from '../dtos/createUserAdmin.dto';
import { logInfo, logError } from '../../../../layers/utils/nodejs/utils';

export class CreateUserAdminService {
  private repository: CreateUserAdminRepository;
  private readonly serviceName = 'CreateUserAdminService';

  constructor() {
    this.repository = new CreateUserAdminRepository();
  }

  /**
   * Crea un nuevo usuario admin
   */
  async createUserAdmin(userData: CreateUserAdminRequest): Promise<CreateUserAdminResponse | null> {
    try {
      logInfo(this.serviceName, 'Iniciando creación de usuario admin', { 
        username: userData.username,
        role_id: userData.role_id 
      });

      // Validar que la contraseña sea segura
      if (!this.isValidPassword(userData.password)) {
        throw new Error('La contraseña debe tener al menos 8 caracteres, incluir al menos una letra mayúscula, una minúscula, un número y un carácter especial');
      }

      // Hash de la contraseña
      const saltRounds = 12;
      const hashedPassword = await bcrypt.hash(userData.password, saltRounds);

      // Crear el usuario usando stored procedure
      const status = userData.status ?? 1; // Por defecto activo
      const result = await this.repository.createUserAdmin(
        userData.username,
        hashedPassword,
        userData.role_id,
        status,
        userData.phone,
        userData.platform_id
      );

      // Verificar si el stored procedure retornó éxito
      if (!result.success) {
        throw new Error(result.message);
      }

      logInfo(this.serviceName, 'Usuario admin creado exitosamente', {
        userId: result.id,
        username: result.username,
        role_name: result.role_name
      });

      // Preparar respuesta (sin incluir la contraseña hasheada)
      const response: CreateUserAdminResponse = {
        user: {
          id: result.id!,
          username: result.username!,
          status: result.status!,
          role_id: result.role_id!,
          role_name: result.role_name!,
          phone: result.phone,
          platform_id: result.platform_id,
          platform_name: result.platform_name,
          created_at: result.created_at || new Date().toISOString(),
        },
        message: result.message
      };

      return response;

    } catch (error) {
      logError(this.serviceName, error instanceof Error ? error : 'Error desconocido', {
        username: userData.username
      });
      throw error;
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