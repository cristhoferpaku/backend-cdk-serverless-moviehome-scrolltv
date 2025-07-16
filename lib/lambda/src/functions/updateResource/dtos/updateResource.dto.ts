

export interface UpdateResourceRequest {
    name?: string;
    image?: string;
    unlinked?: string;
    downloader?: string;
    url?: string;
    state?: number;
    platform_id?: number;
  }
  
  export interface UpdateResourceDbResult {
    id: number;
    name: string;
    image: string;
    unlinked: string;
    downloader: string;
    url: string;
    state: number;
    platform_id: number;
    platform_name: string;
    created_at: string;
    updated_at: string;
    success: boolean;
    message: string;
  }
  
  export interface UpdateResourceResponse {
    success: boolean;
    message: string;
    data?: Omit<UpdateResourceDbResult, 'success' | 'message'>;
  }
  