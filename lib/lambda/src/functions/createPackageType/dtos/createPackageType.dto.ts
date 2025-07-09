export interface CreatePackageTypeRequest {
  name: string;
  status? : number;
}

export interface CreatePackageTypeResponse {
  id: number;
  name: string;
  status: number;
}

export interface CreatePackageTypeDatabaseResponse {
  id: number;
  name: string;
  status: number;
  success: boolean;
  message: string;
} 