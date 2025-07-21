export interface UpdateCollectionsRequest {
    name?: string;
    section_id?: number;
    status?: number;
  }
  
  export interface UpdateCollectionsDbResult {
    id: number;
    name: string;
    status: number;
    section_id: number;
    section_name: string;
    created_at: string;
    updated_at: string;
    success: boolean;
    message: string;
  }
  
  export interface UpdateCollectionsResponse {
    success: boolean;
    message: string;
    data?: Omit<UpdateCollectionsDbResult, 'success' | 'message'>;
  }
  