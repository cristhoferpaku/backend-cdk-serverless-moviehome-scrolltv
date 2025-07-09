// Request DTO - parámetro del ID
export interface DeletePackageSellerRequest {
  id: number;
}

// Response DTO - respuesta del servicio
export interface DeletePackageSellerResponse {
  success: boolean;
  message: string;
}

// Database DTO - resultado del stored procedure
export interface DeletePackageSellerDbResult {
  success: boolean;
  message: string;
} 