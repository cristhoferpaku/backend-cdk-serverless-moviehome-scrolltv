/**
 * DTOs para la función updateUserAdmin
 */

/**
 * Request para actualizar usuario admin
 */
export interface UpdateUserAdminRequest {
  id: string; // Se recibe como string desde path parameters
  username?: string;
  password?: string;
  phone?: string;
  role_id?: number;
  platform_id?: number | null; // Puede ser null para administradores globales
  status?: number;
}

/**
 * Request body para actualizar usuario admin
 */
export interface UpdateUserAdminBody {
  username?: string;
  password?: string;
  phone?: string;
  role_id?: number;
  platform_id?: number | null;
  status?: number;
}

/**
 * Response de usuario admin actualizado
 */
export interface UpdateUserAdminResponse {
  id: number;
  username: string;
  phone: string | null;
  status: number;
  role_id: number;
  role_name: string;
  platform_id: number | null;
  platform_name: string | null;
  created_at: string;
  updated_at: string;
  success: boolean;
  message: string;
}

/**
 * Usuario Admin actualizado para respuesta
 */
export interface UpdatedUserAdminDetails {
  id: number;
  username: string;
  phone: string | null;
  status: number;
  role_id: number;
  role_name: string;
  platform_id: number | null;
  platform_name: string | null;
  created_at: string;
  updated_at: string;
} 