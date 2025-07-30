

export interface CreateEpisodeRequest {
    season_id: number;
    title: string ;
    duration_mins: string;
    description: string | null;
    video_file: string  | null ;

  }
  
  export interface CreateEpisodeResponse {
    success: boolean;
    message: string;
    data?: EpisodeData;
  }
  
  export interface EpisodeData {
    episode_id_result: number;
  }
  
  export interface CreateEpisodeDbResult {
    success: boolean;
    message: string;
    episode_id_result: number;
  }
  