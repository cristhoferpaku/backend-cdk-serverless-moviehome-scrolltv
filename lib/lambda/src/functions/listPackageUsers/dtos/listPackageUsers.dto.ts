/**
 * DTO para la solicitud de listado de paquetes de usuario
 */
export interface ListPackageUsersRequest {
  search?: string;
  page?: number;
  limit?: number;
  userId?: number;

}

/**
 * DTO para la respuesta de un paquete de usuario
 */
export interface PackageUserResponse {
  id: number;
  name: string;
  package_type_id: number;
  package_type_name: string;
  max_devices: number;
  platform_id: number;
  platform_name: string;
  duration_value: number;
  duration_type: string;
  discount_credits: boolean;
  status: number;
  created_at: string;
  updated_at: string;
}

/**
 * DTO para la respuesta paginada de paquetes de usuario
 */
export interface ListPackageUsersResponse {
  items: PackageUserResponse[];
  pagination: {
    page: number;
    pageSize: number;
    totalCount: number;
    totalPages: number;
    hasNext: boolean;
    hasPrevious: boolean;
  };
} 