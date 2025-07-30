

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
  season_id: number;
  episode_num: string;
  title: string | null;
  description: string | null;
  vide_file: string | null;
  duration_mins: string | null;
  created_at: string;
}

export interface GetSeasonByIdDbResult extends SeasonData {
  success: boolean;
  message: string;
}
