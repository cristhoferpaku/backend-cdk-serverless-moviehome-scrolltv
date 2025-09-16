export interface LiveTv {
  id: number;
  name: string;
  url : string;
}

export interface GetLiveTvsResponse {
  items: LiveTv[];
  total: number;
  message: string;
} 