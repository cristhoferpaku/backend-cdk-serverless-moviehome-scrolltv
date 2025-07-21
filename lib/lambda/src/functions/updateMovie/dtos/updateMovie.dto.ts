
export interface UpdateMovieRequest {
    title?: string;
    description?: string;
    cover_image?: string;
    category_ids?: number[];
    section_id?: number;
    country_id?: number;
    collection_id?: number;
    duration_mins?: number;
    video_url?: string;
    status?: number;
    cast_ids?: number[];
    publish_platform_1?: boolean;
    publish_platform_2?: boolean;
  }
  
  export interface UpdateMovieDbResult {
    success: boolean;
    message: string;
    id: number;
  }
  
  export interface UpdateMovieResponse {
    success: boolean;
    message: string;
    data?: Omit<UpdateMovieDbResult, 'success' | 'message'>;
  }
  