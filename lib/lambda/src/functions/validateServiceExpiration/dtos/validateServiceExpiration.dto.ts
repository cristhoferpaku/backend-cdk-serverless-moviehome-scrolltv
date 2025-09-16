export interface ValidateServiceExpirationRequest {
  user_id: number;
  p_device_id: string;
}

export interface ValidateServiceExpirationResponse {
  success: boolean;
  message: string;
  data?: ServiceExpirationData;
}

export interface ServiceExpirationData {
  expiration_date: string;
}

export interface ValidateServiceExpirationDbResult {
  expiration_date: string;
  success: boolean;
  message: string;
}
  