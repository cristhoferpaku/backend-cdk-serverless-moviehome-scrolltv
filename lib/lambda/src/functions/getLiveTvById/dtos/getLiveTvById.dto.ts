export interface GetLiveTvByIdRequest {
  id: number;
}

export interface GetLiveTvByIdResponse {
  id: number;
  name: string;
  url: string;
  status: number;
  created_at: string;
  updated_at: string;
}

export interface GetLiveTvByIdServiceResponse {
  success: boolean;
  data?: GetLiveTvByIdResponse;
  message: string;
}

export interface GetLiveTvByIdDbResult {
  id: number | null;
  name: string | null;
  url: string | null;
  status: number | null;
  created_at: string | null;
  updated_at: string | null;
  success: boolean;
  message: string;
}