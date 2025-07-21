export interface UpdateMultimediaCategoriesRequest {
    name?: string;
    status?: number;
  }
  
  export interface UpdateMultimediaCategoriesDbResult {
    id: number;
    name: string;
    status: number;
    created_at: string;
    updated_at: string;
    success: boolean;
    message: string;
  }
  
  export interface UpdateMultimediaCategoriesResponse {
    success: boolean;
    message: string;
    data?: Omit<UpdateMultimediaCategoriesDbResult, 'success' | 'message'>;
  }
  