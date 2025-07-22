export interface ListSerieQueryParams {
  search?: string;
  status?: string; // Ej: "1,2"
  page?: string;
  limit?: string;
}

export interface ListSerieParams {
  search: string | null;
  status: number[] | null;
  page: number;
  limit: number;
}

export interface SerieRecord {
  id: number;
  title: string;
  section_name: string;
  categories_list: string;
  country_name: string;
  collection_name: string;
  status: number;
  created_at: string;
  total_count: number;
}

export interface ListSerieResponse {
  items: SerieRecord[];
  pagination: {
    page: number;
    pageSize: number;
    totalCount: number;
    totalPages: number;
    hasNext: boolean;
    hasPrevious: boolean;
  };
}
