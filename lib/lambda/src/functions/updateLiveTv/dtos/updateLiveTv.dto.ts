

export interface UpdateLiveTvRequest {
    name?: string;
    url?: string;
  }
  
  export interface UpdateLiveTvDbResult {
    id: number;
    name: string;
    url: string;
    created_at: string;
    updated_at: string;
    success: boolean;
    message: string;
  }
  
  export interface UpdateLiveTvResponse {
    success: boolean;
    message: string;
    data?: Omit<UpdateLiveTvDbResult, 'success' | 'message'>;
  }
  