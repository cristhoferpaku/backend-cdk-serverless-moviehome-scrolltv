/**
 * DTO para la solicitud de cambio de status de paquete de usuario
 */
export interface ChangePackageUserStatusRequest {
  status: number;
}

/**
 * DTO para la respuesta de cambio de status de paquete de usuario
 */
export interface ChangePackageUserStatusResponse {
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