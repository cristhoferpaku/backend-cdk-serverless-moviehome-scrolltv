export interface RefreshTokenRequest {
  refreshToken: string;
}

export interface RefreshTokenResponse {
  user: {
    id: number;
    username: string;
    status: number;
    role_id: number;
    role_name: string;
  };
  tokens: {
    accessToken: string;
    refreshToken: string;
    expiresIn: number;
    refreshExpiresIn: number;
    tokenType: string;
  };
}

export interface RefreshTokenPayload {
  userId: number;
  username: string;
  roleId: number;
  roleName: string;
  tokenType: 'refresh';
} 