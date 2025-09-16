export interface RefreshTokenClientRequest {
  refreshToken: string;
}

export interface RefreshTokenClientResponse {
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