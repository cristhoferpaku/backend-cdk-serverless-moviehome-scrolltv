export interface CreateUserAccountRequest {
    username: string;
    password: string;
    package_user_id: number;
    platform_id: number;
    user_admin_id: number;
  }
  
  export interface CreateUserAccountResponse {
    success: boolean;
    message: string;
    data?: UserAccountData;
  }
  
  export interface UserAccountData {
    id: number;
    username: string;
    platform_id: number;
    package_user_id: number;
    status: number;
    service_started: boolean;
    start_date: string;
    expiration_date: string;
    can_change_package: boolean;
    created_at: string;
    updated_at: string;
  }
  
  export interface CreateUserAccountDbResult {
    id: number;
    username: string;
    platform_id: number;
    package_user_id: number;
    status: number;
    service_started: boolean;
    start_date: string;
    expiration_date: string;
    can_change_package: boolean;
    created_at: string;
    updated_at: string;
    success: boolean;
    message: string;
  }
  