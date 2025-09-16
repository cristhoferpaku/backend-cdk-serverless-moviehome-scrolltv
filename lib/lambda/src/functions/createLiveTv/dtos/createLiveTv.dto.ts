export interface CreateLiveTvRequest {
  name: string;
  url: string;
}

export interface CreateLiveTvResponse {
  success: boolean;
  message: string;
  data?: LiveTvData;
}

export interface LiveTvData {
  id: number;
  name: string;
  url: string;
  created_at: string;
  updated_at: string;
}

export interface CreateLiveTvDbResult {
  id: number;
  name: string;
  url: string;
  created_at: string;
  updated_at: string;
  success: boolean;
  message: string;
}



