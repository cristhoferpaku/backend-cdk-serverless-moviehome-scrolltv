export interface CreatePackageSellerRequestDto {
  name: string;
  credit: number;
  package_type_id: number;
  platform_id: number;
  status?: number;
}

export interface CreatePackageSellerRequest {
  name: string;
  credit: number;
  package_type_id: number;
  platform_id: number;
  status?: number;
}

export interface CreatePackageSellerResponseDto {
  id: number;
  name: string;
  credit: number;
  platform_id: number | null;
  platform_name: string | null;
  package_type_id: number;
  package_type_name: string;
  status: number;
  created_at: string;
  updated_at: string;
}

export interface CreatePackageSellerDatabaseResponseDto {
  id: number;
  name: string;
  credit: number;
  platform_id: number | null;
  platform_name: string | null;
  package_type_id: number;
  package_type_name: string;
  status: number;
  created_at: Date;
  updated_at: Date;
  success: boolean;
  message: string;
} 