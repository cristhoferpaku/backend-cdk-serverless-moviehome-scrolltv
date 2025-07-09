/**
 * DTOs para la función getUserAdminById
 */

/**
 * Request para obtener usuario admin por ID
 */
export interface GetUserAdminByIdRequest {
  id: string; // Se recibe como string desde path parameters
}

/**
 * Response de usuario admin obtenido
 */
export interface GetUserAdminByIdResponse {
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
 * Usuario Admin simplificado para respuesta
 */
export interface UserAdminDetails {
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