export interface UpdateUserAccountRequest {
    username?: string;
    password?: string;
    package_user_id?: number;
    platform_id?: number;
    user_admin_id?: number;
    status?: number;
  }
  
  export interface UpdateUserAccountDbResult {
    id: number;
    username: string;
    platform_name: string;
    package_user_name: string;
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
  
  export interface UpdateUserAccountResponse {
    success: boolean;
    message: string;
    data?: Omit<UpdateUserAccountDbResult, 'success' | 'message'>;
  }
  