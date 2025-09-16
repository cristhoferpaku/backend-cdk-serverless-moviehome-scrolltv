import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import { SignOptions } from 'jsonwebtoken';
import { ClientLoginRepository } from '../repositories/clientLogin.repo';
import { LoginRequest, LoginResponse, JWTPayload, LoginDbResult } from '../dtos/clientLogin.dto';

export class ClientLoginService {
  private clientLoginRepo: ClientLoginRepository;

  constructor() {
    this.clientLoginRepo = new ClientLoginRepository();
  }

  /**
   * Autentica un cliente móvil usando stored procedure
   */
  async login(loginData: LoginRequest): Promise<LoginResponse | null> {
    // Llamar al stored procedure sp_login_user
    const dbResult: LoginDbResult = await this.clientLoginRepo.loginUser(loginData);
    
    // Verificar si el login fue exitoso
    if (!dbResult.success) {
      throw new Error(dbResult.message);
    }

    // Verificar si el cliente está activo
    if (dbResult.status !== 1) {
      throw new Error('Cliente inactivo');
    }

    // Generar tokens específicos para cliente móvil
    const tokens = this.generateTokens({
      userId: dbResult.id,
      username: dbResult.username,
      roleId: dbResult.role_id,
      roleName: dbResult.role_name
    });

    return {
      user: {
        id: dbResult.id,
        username: dbResult.username,
        status: dbResult.status,
        role_id: dbResult.role_id,
        role_name: dbResult.role_name
      },
      tokens
    };
  }

  /**
   * Genera los tokens JWT para clientes móviles
   * Con tiempos de expiración más largos para mejor UX móvil
   */
  private generateTokens(payload: JWTPayload) {
    const jwtSecret = process.env.JWT_SECRET || 'moviehome-secret-key';
    const expiresIn = process.env.JWT_MOBILE_EXPIRES_IN || '1d'; //  1d en mobil
    const refreshExpiresIn = process.env.JWT_MOBILE_REFRESH_EXPIRES_IN || '7d'; // 7 días

    const accessTokenOptions = {
      expiresIn,
     audience: 'moviehome-api',
      issuer: 'moviehome-scrolltv'
    } as SignOptions;

    const refreshTokenOptions = {
      expiresIn: refreshExpiresIn,
     audience: 'moviehome-api',
      issuer: 'moviehome-scrolltv'
    } as SignOptions;

    const accessToken = jwt.sign(payload, jwtSecret, accessTokenOptions);
    const refreshToken = jwt.sign(
      { userId: payload.userId, username: payload.username, roleId: payload.roleId },
      jwtSecret,
      refreshTokenOptions
    );

    return {
      accessToken,
      refreshToken,
      expiresIn: 86400, // 1 día
      refreshExpiresIn: 604800, // 7 días
      tokenType: 'Bearer'
    };
  }

  /**
   * Valida si el string es un email válido
   */
  private isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
}