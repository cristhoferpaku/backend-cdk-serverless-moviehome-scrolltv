

export interface CreateMovieRequest {
    title: string;
    description: string;
    category_ids: number[] | null;
    section_id: number;
    country_id: number;
    collection_id: number;
    duration_mins: number;
    cover_image: string | null;
    banner_image: string | null;

    video_url: string | null;
    cast_ids: number[] | null;
    publish_platform_1: boolean ;
    publish_platform_2: boolean;
  }
  
  export interface CreateMovieResponse {
    success: boolean;
    message: string;
    data?: MovieData;
  }
  
  export interface MovieData {
    movie_id: number;
  }
  
  export interface CreateMovieDbResult {
    success: boolean;
    message: string;
    movie_id: number;
  }
  