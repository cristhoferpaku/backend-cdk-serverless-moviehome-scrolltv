// Response DTO - estructura de la respuesta
export interface GetPackageSellerByIdResponse {
  id: number;
  name: string;
  credit: number;
  platformId: number | null;
  platformName: string | null;
  packageTypeId: number;
  packageTypeName: string;
  status: number;
  createdAt: string;
  updatedAt: string;
  message: string;
}

// Database DTO - resultado del stored procedure
export interface GetPackageSellerByIdDbResult {
  id: number | null;
  name: string | null;
  credit: number | null;
  platform_id: number | null;
  platform_name: string | null;
  package_type_id: number | null;
  package_type_name: string | null;
  status: number | null;
  created_at: Date | null;
  updated_at: Date | null;
  success: boolean;
  message: string;
} 