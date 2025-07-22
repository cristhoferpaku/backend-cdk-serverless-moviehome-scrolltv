

export interface CreateSeasonRequest {
    series_id: number;
    description: string | null;
    cover_image: string | null;
    cast_ids: number[] | null;

  }
  
  export interface CreateSeasonResponse {
    success: boolean;
    message: string;
    data?: SeasonData;
  }
  
  export interface SeasonData {
    season_id_result: number;
  }
  
  export interface CreateSeasonDbResult {
    success: boolean;
    message: string;
    season_id_result: number;
  }
  