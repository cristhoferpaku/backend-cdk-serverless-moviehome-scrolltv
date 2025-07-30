export interface ListSeasonQueryParams {
  season_id?: number;
}

export interface ListSeasonParams {
  season_id: number | null;
}

export interface SeasonRecord {
  id: number;
  episode_num: string;
}

export interface ListSeasonResponse {
  items: SeasonRecord[];
}
