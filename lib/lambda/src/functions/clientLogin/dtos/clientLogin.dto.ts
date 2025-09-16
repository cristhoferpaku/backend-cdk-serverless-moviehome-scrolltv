export interface LoginRequest {
  username: string;
  password: string;
  id_device: string;
  platform: number;
}

export interface ClientUser {
  id: number;
  username: string;
  password: string;
  status: number;
  role_id: number;
  role_name: string;
}

export interface LoginResponse {
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

export interface JWTPayload {
  userId: number;
  username: string;
  roleId: number;
  roleName: string;
}

export interface LoginDbResult {
  id: number;
  username: string;
  password: string;
  status: number;
  role_id: number;
  role_name: string;
  success: boolean;
  message: string;
}