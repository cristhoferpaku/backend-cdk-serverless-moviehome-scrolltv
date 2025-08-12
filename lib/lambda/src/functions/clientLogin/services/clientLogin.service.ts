import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import { SignOptions } from 'jsonwebtoken';
import { ClientLoginRepository } from '../repositories/clientLogin.repo';
import { LoginRequest, LoginResponse, JWTPayload } from '../dtos/clientLogin.dto';

export class ClientLoginService {
  private clientLoginRepo: ClientLoginRepository;

  constructor() {
    this.clientLoginRepo = new ClientLoginRepository();
  }

  /**
   * Autentica un cliente móvil
   * Permite login con username o email
   */
  async login(loginData: LoginRequest): Promise<LoginResponse | null> {
    // Intentar buscar por username primero
    let user = await this.clientLoginRepo.findByUsername(loginData.username);
    if (!user) {
      return null;
    }

    // Verificar si el cliente está activo
    if (user.status !== 1) {
      throw new Error('Cliente inactivo');
    }

    // Verificar contraseña
    const isValidPassword = await bcrypt.compare(loginData.password, user.password);
    
    if (!isValidPassword) {
      return null;
    }

    // Generar tokens específicos para cliente móvil
    const tokens = this.generateTokens({
      userId: user.id,
      username: user.username,
      roleId: user.role_id, // Siempre será 4
      roleName: user.role_name // Siempre será 'cliente'
    });

    return {
      user: {
        id: user.id,
        username: user.username,
        status: user.status,
        role_id: user.role_id,
        role_name: user.role_name
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
    const expiresIn = process.env.JWT_MOBILE_EXPIRES_IN || '7d'; // Más tiempo para móvil
    const refreshExpiresIn = process.env.JWT_MOBILE_REFRESH_EXPIRES_IN || '30d'; // Más tiempo para móvil

    const accessTokenOptions = {
      expiresIn,
      audience: 'moviehome-mobile-api',
      issuer: 'moviehome-scrolltv'
    } as SignOptions;

    const refreshTokenOptions = {
      expiresIn: refreshExpiresIn,
      audience: 'moviehome-mobile-api',
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
      expiresIn: 604800, // 7 días
      refreshExpiresIn: 2592000, // 30 días
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