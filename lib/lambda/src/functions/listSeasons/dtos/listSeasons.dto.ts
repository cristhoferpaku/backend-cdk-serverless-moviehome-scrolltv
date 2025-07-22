export interface ListSeasonQueryParams {
  serie_id?: number;
}

export interface ListSeasonParams {
  serie_id: number | null;
}

export interface SeasonRecord {
  id: number;
  season_num: string;
}

export interface ListSeasonResponse {
  items: SeasonRecord[];
}
