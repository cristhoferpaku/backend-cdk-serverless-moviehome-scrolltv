
export interface UpdateSeasonRequest {
    p_season_id?: number;
    description?: string | null;
    cover_image?: string | null;
    p_cast_ids?: number[];
  }
  
  export interface UpdateSeasonDbResult {
    success: boolean;
    message: string;
    season_id_response: number;
  }
  
  export interface UpdateSeasonResponse {
    success: boolean;
    message: string;
    data?: Omit<UpdateSeasonDbResult, 'success' | 'message'>;
  }
  