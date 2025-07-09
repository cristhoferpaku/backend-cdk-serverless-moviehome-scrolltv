/**
 * DTOs para la función changeUserAdminStatus
 */

/**
 * Request para cambiar status de usuario admin
 */
export interface ChangeUserAdminStatusRequest {
  id: string; // Se recibe como string desde path parameters
  status: number; // Se recibe en el body
}

/**
 * Request body para cambiar status de usuario admin
 */
export interface ChangeUserAdminStatusBody {
  status: number; // 0: inactivo, 1: activo, 2: suspendido
}

/**
 * Response de cambio de status de usuario admin
 */
export interface ChangeUserAdminStatusResponse {
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
 * Usuario Admin con status actualizado para respuesta
 */
export interface UpdatedStatusUserAdminDetails {
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