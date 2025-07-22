

export interface GetSeasonByIdRequest {
  id: number;
}

export interface GetSeasonByIdResponse {
  success: boolean;
  message: string;
  data?: SeasonData;
}


export interface SeasonData {
  id: number;
  series_id: number;
  season_num: string;
  description: string | null;
  cover_image: string | null;
  created_at: string;
  updated_at: string;
  cast_list: string ;
  episodes_list: string;
}

export interface GetSeasonByIdDbResult extends SeasonData {
  success: boolean;
  message: string;
}
