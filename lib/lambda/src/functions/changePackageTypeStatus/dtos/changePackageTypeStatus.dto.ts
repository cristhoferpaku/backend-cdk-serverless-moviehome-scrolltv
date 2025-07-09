/**
 * DTO para la solicitud de cambio de status de package type
 */
export interface ChangePackageTypeStatusRequest {
  status: number;
}

/**
 * DTO para la respuesta de cambio de status de package type
 */
export interface ChangePackageTypeStatusResponse {
  id: number;
  name: string;
  status: number;
  success: boolean;
  message: string;
} 