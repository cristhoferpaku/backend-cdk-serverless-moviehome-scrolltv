
export interface UpdateEpisodeRequest {
    episode_id?: number;
    title?: string | null;
    description?: string | null;
    video_file?: string | null;
    duration_mins?: number | null;
  }
  
  export interface UpdateEpisodeDbResult {
    success: boolean;
    message: string;
    episode_id: number;
  }
  
  export interface UpdateEpisodeResponse {
    success: boolean;
    message: string;
    data?: Omit<UpdateEpisodeDbResult, 'success' | 'message'>;
  }
  