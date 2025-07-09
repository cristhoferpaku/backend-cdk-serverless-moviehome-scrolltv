export interface CreateUserAdminRequest {
  username: string;
  password: string;
  role_id: number;
  status?: number; // opcional, por defecto 1 (activo)
  phone?: string; // opcional
  platform_id?: number; // opcional, NULL = admin global
}

export interface CreateUserAdminResponse {
  user: {
    id: number;
    username: string;
    status: number;
    role_id: number;
    role_name: string;
    phone?: string;
    platform_id?: number;
    platform_name?: string;
    created_at: string;
  };
  message: string;
}




export interface StoredProcedureResult {
  id?: number;
  username?: string;
  password?: string;
  phone?: string;
  status?: number;
  role_id?: number;
  role_name?: string;
  platform_id?: number;
  platform_name?: string;
  created_at?: string;
  updated_at?: string;
  success: boolean;
  message: string;
} 