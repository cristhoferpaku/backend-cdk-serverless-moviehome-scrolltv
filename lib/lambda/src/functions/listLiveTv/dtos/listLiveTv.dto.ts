export interface ListLiveTvRequest {
  search_name?: string;
  status?: number[];
  page?: number;
  page_size?: number;
}

export interface ListLiveTvResponse {
  items: LiveTvChannel[];
  pagination: {
    page: number;
    pageSize: number;
    totalCount: number;
    totalPages: number;
    hasNext: boolean;
    hasPrevious: boolean;
  };
}

export interface LiveTvChannel {
  id: number;
  name: string;
  url: string;
  status : number;
  created_at: string;
  updated_at: string;
}

export interface ListLiveTvDbResult {
  id: number;
  name: string;
  url: string;
  status: number;
  created_at: string;
  updated_at: string;
  total_count: number;
}