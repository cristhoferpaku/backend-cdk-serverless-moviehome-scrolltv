import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import { SignOptions } from 'jsonwebtoken';
import { AdminLoginRepository } from '../repositories/adminLogin.repo';
import { LoginRequest, LoginResponse, JWTPayload } from '../dtos/adminLogin.dto';

export class AdminLoginService {
  private adminLoginRepo: AdminLoginRepository;

  constructor() {
    this.adminLoginRepo = new AdminLoginRepository();
  }

  /**
   * Autentica un usuario admin
   */
  async login(loginData: LoginRequest): Promise<LoginResponse | null> {
    // Buscar usuario
    const user = await this.adminLoginRepo.findByUsername(loginData.username);
    
    if (!user) {
      return null;
    }

    // Verificar si el usuario está activo
    if (user.status !== 1) {
      throw new Error('Usuario inactivo');
    }

    // Verificar contraseña
    const isValidPassword = await bcrypt.compare(loginData.password, user.password);
    
    if (!isValidPassword) {
      return null;
    }

    // Generar tokens
    const tokens = this.generateTokens({
      userId: user.id,
      username: user.username,
      roleId: user.role_id,
      roleName: user.role_name
    });

    // Actualizar última fecha de login
    // await this.adminLoginRepo.updateLastLogin(user.id);

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
   * Genera los tokens JWT
   */
  private generateTokens(payload: JWTPayload) {
    const jwtSecret = process.env.JWT_SECRET || 'moviehome-secret-key';
    const expiresIn = process.env.JWT_EXPIRES_IN || '1d';
    const refreshExpiresIn = process.env.JWT_REFRESH_EXPIRES_IN || '7d';

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
      { userId: payload.userId, username: payload.username },
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
} 