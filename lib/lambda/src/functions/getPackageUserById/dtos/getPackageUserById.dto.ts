/**
 * DTOs para getPackageUserById
 */

export interface GetPackageUserByIdRequest {
  id: number;
}

export interface GetPackageUserByIdResponse {
  success: boolean;
  message?: string;
  data?: PackageUserData;
}

export interface PackageUserData {
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

export interface GetPackageUserByIdDbResult {
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