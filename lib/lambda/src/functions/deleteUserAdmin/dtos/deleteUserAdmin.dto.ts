/**
 * DTOs para la función deleteUserAdmin
 */

/**
 * Request para eliminar usuario admin
 */
export interface DeleteUserAdminRequest {
  id: string; // Se recibe como string desde path parameters
}

/**
 * Response de eliminación de usuario admin
 */
export interface DeleteUserAdminResponse {
  success: boolean;
  message: string;
}

/**
 * Respuesta simplificada para el cliente
 */
export interface DeleteUserAdminResult {
  deleted: boolean;
  message: string;
} 