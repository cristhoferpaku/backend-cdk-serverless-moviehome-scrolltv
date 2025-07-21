export interface CreateCollectionsRequest {
    name: string;
    section_id: number;
    status: number;
  }
  
  export interface CreateCollectionsResponse {
    success: boolean;
    message: string;
    data?: CollectionsData;
  }
  
  export interface CollectionsData {
    id: number;
    name: string;
    section_id: number;
    section_name: string;
    status: number;
    created_at: string;
    updated_at: string;
  }
  
  export interface CreateCollectionsDbResult {
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
  