/**
 * DTO para cambiar status de paquete vendedor
 */

// Request interfaces
export interface ChangePackageSellerStatusRequest {
  status: number;
}

// Response interfaces
export interface ChangePackageSellerStatusResponse {
  id: number;
  name: string;
  credit: number;
  platform_id: number;
  platform_name: string;
  package_type_id: number;
  package_type_name: string;
  status: number;
  created_at: string;
  updated_at: string;
}

// Database interfaces
export interface ChangePackageSellerStatusDbResult {
  id: number;
  name: string;
  credit: number;
  platform_id: number;
  platform_name: string;
  package_type_id: number;
  package_type_name: string;
  status: number;
  created_at: Date;
  updated_at: Date;
  success: boolean;
  message: string;
} 