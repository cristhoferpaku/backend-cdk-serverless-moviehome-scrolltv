
export interface UpdateSerieRequest {
    title?: string;
    description?: string;
    cover_image?: string;
    banner_image?: string;
    category_ids?: number[];
    section_id?: number;
    country_id?: number;
    collection_id?: number;
    status?: number;
    publish_platform_1?: boolean;
    publish_platform_2?: boolean;
  }
  
  export interface UpdateSerieDbResult {
    success: boolean;
    message: string;
    serie_id: number;
    publish_platform_1: boolean;
    publish_platform_2: boolean;
  }
  
  export interface UpdateSerieResponse {
    success: boolean;
    message: string;
    data?: Omit<UpdateSerieDbResult, 'success' | 'message'>;
  }
  