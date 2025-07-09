import * as jwt from 'jsonwebtoken';
import { SignOptions } from 'jsonwebtoken';
import { RefreshTokenRepository } from '../repositories/refreshToken.repo';
import { RefreshTokenResponse, RefreshTokenPayload } from '../dtos/refreshToken.dto';

export class RefreshTokenService {
  private refreshTokenRepo: RefreshTokenRepository;

  constructor() {
    this.refreshTokenRepo = new RefreshTokenRepository();
  }

  /**
   * Refresca el token de acceso usando un refresh token válido
   */
  async refreshToken(refreshToken: string): Promise<RefreshTokenResponse | null> {
    try {
      // Verificar y decodificar el refresh token
      const jwtSecret = process.env.JWT_SECRET || 'moviehome-secret-key';
      const decoded = jwt.verify(refreshToken, jwtSecret) as any;

      if (!decoded.userId) {
        return null;
      }

      // Buscar usuario por ID
      const user = await this.refreshTokenRepo.findUserById(decoded.userId);
      
      if (!user) {
        return null;
      }

      // Verificar si el usuario está activo
      if (user.status !== 1) {
        throw new Error('Usuario inactivo');
      }

      // Generar nuevos tokens
      const tokens = this.generateTokens({
        userId: user.id,
        username: user.username,
        roleId: user.role_id,
        roleName: user.role_name,
        tokenType: 'refresh'
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

    } catch (error) {
      // Si el token es inválido o ha expirado
      if (error instanceof jwt.JsonWebTokenError || error instanceof jwt.TokenExpiredError) {
        return null;
      }
      throw error;
    }
  }

  /**
   * Genera los tokens JWT
   */
  private generateTokens(payload: RefreshTokenPayload) {
    const jwtSecret = process.env.JWT_SECRET || 'moviehome-secret-key';
    const expiresIn = process.env.JWT_EXPIRES_IN || '30m';
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

    const accessToken = jwt.sign({
      userId: payload.userId,
      username: payload.username,
      roleId: payload.roleId,
      roleName: payload.roleName
    }, jwtSecret, accessTokenOptions);

    const newRefreshToken = jwt.sign(
      { userId: payload.userId, username: payload.username },
      jwtSecret,
      refreshTokenOptions
    );

    return {
      accessToken,
      refreshToken: newRefreshToken,
      expiresIn: 1800, // 30 minutos
      refreshExpiresIn: 604800, // 7 días
      tokenType: 'Bearer'
    };
  }
} 