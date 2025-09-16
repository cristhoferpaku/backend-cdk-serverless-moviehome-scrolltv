

export interface GetMovieByIdRequest {
  id: number;
}

export interface GetMovieByIdResponse {
  success: boolean;
  message: string;
  data?: MovieData;
}


export interface MovieData {
  id: number;
  title: string;
  description: string;
  cover_image: string;
  banner_image: string;
  duration_mins: number;
  video_url: string;
  status: number;
  categories_list: string;
  category_name: string;
  section_id: number;
  section_name: string;
  country_id: number;
  country_name: string;
  collection_id: number;
  collection_name: string;
  created_at: string;
  updated_at: string;
  cast_list: string;
  published_platform_1: boolean;
  published_platform_2: boolean;
}

export interface GetMovieByIdDbResult extends MovieData {
  success: boolean;
  message: string;
}
