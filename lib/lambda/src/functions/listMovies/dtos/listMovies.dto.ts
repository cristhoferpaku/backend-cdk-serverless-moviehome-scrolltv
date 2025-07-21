export interface ListMovieQueryParams {
  search?: string;
  status?: string; // Ej: "1,2"
  page?: string;
  limit?: string;
}

export interface ListMovieParams {
  search: string | null;
  status: number[] | null;
  page: number;
  limit: number;
}

export interface MovieRecord {
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

export interface ListMovieResponse {
  items: MovieRecord[];
  pagination: {
    page: number;
    pageSize: number;
    totalCount: number;
    totalPages: number;
    hasNext: boolean;
    hasPrevious: boolean;
  };
}
