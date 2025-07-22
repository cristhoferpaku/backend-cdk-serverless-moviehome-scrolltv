

export interface GetSerieByIdRequest {
  id: number;
}

export interface GetSerieByIdResponse {
  success: boolean;
  message: string;
  data?: SerieData;
}


export interface SerieData {
  content_id: number;
  serie_id: number;
  title: string;
  description: string;
  cover_image: string | null;
  duration_mins: number | null;
  status: number;
  categories_list: string;
  section_id: number;
  section_name: string;
  country_id: number;
  country_name: string;
  collection_id: number;
  collection_name: string;
  created_at: string;
  updated_at: string;
  published_platform_1: boolean;
  published_platform_2: boolean;
}

export interface GetSerieByIdDbResult extends SerieData {
  success: boolean;
  message: string;
}
