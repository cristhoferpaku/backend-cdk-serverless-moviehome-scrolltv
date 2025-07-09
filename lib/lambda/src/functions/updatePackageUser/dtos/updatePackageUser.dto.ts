/**
 * DTO para la solicitud de actualización de paquete de usuario
 */
export interface UpdatePackageUserRequest {
  name?: string;
  package_type_id?: number;
  max_devices?: number;
  platform_id?: number;
  duration_value?: number;
  duration_type?: 'days' | 'hours';
  discount_credits?: boolean;
  status?: number;
}

/**
 * DTO para la respuesta de actualización de paquete de usuario
 */
export interface UpdatePackageUserResponse {
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
  success: boolean;
  message: string;
} 