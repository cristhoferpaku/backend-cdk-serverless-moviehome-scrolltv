

export interface GetEpisodesFromSeasonRequest {
  season_id: number;
}

export interface GetEpisodesFromSeasonResponse {
  success: boolean;
  message: string;
  data?: EpisodeData[];
}

  //  int? episodeId,
  //   int? episodeNumber,
  //   String? coverImage,
  //   String? description,
  //   int? durationMins,
  //   String? videoUrl,

export interface EpisodeData {
  episodeId: number;
  episodeNumber: number;
  title: string;
  description: string;
  durationMins: number;
  videoFile: string;
}

export interface GetEpisodesFromSeasonDbResult {
  id: number;
  episode_num: number;
  title: string;
  description: string;
  video_file: string;
  duration_mins: number;
  created_at: string;
  updated_at: string;
}
