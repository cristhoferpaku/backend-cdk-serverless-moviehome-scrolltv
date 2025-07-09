/**
 * DTOs para la función listUserAdmins
 */

/**
 * Parámetros de consulta para listar usuarios administradores
 */
export interface ListUserAdminsQueryParams {
  search?: string;        // Búsqueda por username
  roleId?: string;        // IDs de roles separados por coma (ej: "2,3")
  page?: string;          // Número de página
  limit?: string;         // Límite de resultados por página
}

/**
 * Parámetros procesados para el stored procedure
 */
export interface ListUserAdminsParams {
  searchUsername: string | null;
  page: number;
  pageSize: number;
  roleIds: number[] | null;
}

/**
 * Respuesta del stored procedure sp_list_user_admins
 */
export interface UserAdminRecord {
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
  total_count: number;
}

/**
 * Respuesta paginada de usuarios administradores
 */
export interface ListUserAdminsResponse {
  items: UserAdminRecord[];
  pagination: {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    itemsPerPage: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
  };
 
}

/**
 * Respuesta de error
 */
export interface ListUserAdminsError {
  success: false;
  message: string;
} 