export interface ListRevendedoresQueryParams {
  search?: string;
  status?: string;
  page?: string;
  limit?: string;
}

export interface ListRevendedoresRequest {
  search: string | null;
  status: number[] | null;
  page: number;
  limit: number;
}

export interface RevendedoresItem {
  id: number;
  username: string;
  credit: number;
  status: number;
  created_at: string;
  total_count: number;
}

export interface ListRevendedoresResponse {
  items: RevendedoresItem[];
  pagination: {
      page: number;
      pageSize: number;
     totalCount: number;
     totalPages: number;
     hasNext: boolean;
     hasPrevious: boolean;
  };
}

