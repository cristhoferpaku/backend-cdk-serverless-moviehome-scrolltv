/**
 * DTOs para createPackageUser
 */

export interface CreatePackageUserRequest {
  name: string;
  package_type_id: number;
  platform_id: number;
  duration_value: number;
  duration_type: 'days' | 'hours';
  max_devices?: number;
  discount_credits?: boolean;
}

export interface CreatePackageUserResponse {
  success: boolean;
  message: string;
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

export interface CreatePackageUserDbResult {
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