// Request DTO - parámetros de búsqueda y paginación
export interface ListPackageSellerRequest {
  search?: string;          // Búsqueda por nombre
  page?: number;            // Número de página
  pageSize?: number;        // Tamaño de página
}

// Item individual de la respuesta
export interface PackageSellerItem {
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
}

// Información de paginación
export interface PaginationInfo {
  page: number;
  pageSize: number;
  totalCount: number;
  totalPages: number;
  hasNext: boolean;
  hasPrevious: boolean;
}

// Response DTO - estructura de la respuesta con paginación
export interface ListPackageSellerResponse {
  items: PackageSellerItem[];
  pagination: PaginationInfo;
}

// Database DTO - resultado del stored procedure
export interface ListPackageSellerDbResult {
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
  total_count: string; // Viene como string desde PostgreSQL COUNT
} 