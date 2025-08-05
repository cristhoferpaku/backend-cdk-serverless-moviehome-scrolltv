export interface CreateRevendedorRequest {
  username: string;
  password: string;
  phone: string;
  credit: number;
}

export interface CreateRevendedorResponse {
  success: boolean;
  message: string;
}