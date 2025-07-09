export interface GetUserAccountByIdRequest {
  id: number;
}

export interface GetUserAccountByIdResponse {
  success: boolean;
  message: string;
  data?: UserAccountData;
}

export interface UserAccountData {
  id: number;
  username: string;
  platform_id: number;
  platform_name: string;
  package_user_id: number;
  package_user_name: string;
  status: number;
  service_started: boolean;
  start_date: string;
  expiration_date: string;
  can_change_package: boolean;
  created_at: string;
  updated_at: string;
}

export interface GetUserAccountByIdDbResult extends UserAccountData {
  success: boolean;
  message: string;
}
