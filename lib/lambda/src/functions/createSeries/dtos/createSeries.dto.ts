

export interface CreateSerieRequest {
    title: string;
    description: string;
    category_ids: number[] | null;
    section_id: number;
    country_id: number;
    collection_id: number;
    cover_image: string | null;
    banner_image: string | null;
    publish_platform_1: boolean;
    publish_platform_2: boolean;
  }
  
  export interface CreateSerieResponse {
    success: boolean;
    message: string;
    data?: SerieData;
  }
  
  export interface SerieData {
    content_id: number;
    serie_id: number; 
  }
  
  export interface CreateSerieDbResult {
    success: boolean;
    message: string;
    content_id: number;
    serie_id: number;
  }
  