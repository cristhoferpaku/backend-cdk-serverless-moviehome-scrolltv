export interface CreateMultimediaCategoriesRequest {
    name: string;
    status: number;
  }
  
  export interface CreateMultimediaCategoriesResponse {
    success: boolean;
    message: string;
    data?: MultimediaCategoriesData;
  }
  
  export interface MultimediaCategoriesData {
    id: number;
    name: string;
    status: number;
    created_at: string;
    updated_at: string;
  }
  
  export interface CreateMultimediaCategoriesDbResult {
    id: number;
    name: string;
    status: number;
    created_at: string;
    updated_at: string;
    success: boolean;
    message: string;
  }
  