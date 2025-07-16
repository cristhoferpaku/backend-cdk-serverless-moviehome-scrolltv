export interface DeleteUserAdminRequest {
  id: string;
}

export interface DeleteUserAdminResponse {
  success: boolean;
  message: string;
}

export interface DeleteUserAdminResult {
  deleted: boolean;
  message: string;
} 