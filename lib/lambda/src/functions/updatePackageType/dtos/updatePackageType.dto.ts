// Request DTO - datos que llegan del cliente
export interface UpdatePackageTypeRequest {
  name: string;
  status?: number;
}

// Response DTO - estructura de la respuesta
export interface UpdatePackageTypeResponse {
  id: number;
  name: string;
  status: number | null;
  message: string;
}

// Database DTO - resultado del stored procedure
export interface UpdatePackageTypeDbResult {
  id: number | null;
  name: string | null;
  status: number | null;
  success: boolean;
  message: string;
} 