export interface GetPackageTypeByIdRequest {
  id: number;
}

export interface GetPackageTypeByIdResponse {
  id: number;
  name: string;
  status: number;
}

export interface GetPackageTypeByIdDatabaseResponse {
  id: number;
  name: string;
  status: number;
  success: boolean;
  message: string;
} 