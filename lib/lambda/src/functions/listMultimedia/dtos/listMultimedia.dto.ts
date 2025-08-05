export interface ListMultimediaQueryParams {
  search?: string;
  status?: string; // Ej: "1,2"
  type?: string;
  page?: string;
  limit?: string;
}

export interface ListMultimediaParams {
  search: string | null;
  status: number[] | null;
  type: string | null;
  page: number;
  limit: number;
}

export interface MultimediaRecord {
  id: number;
  title: string;
  section_name: string;
  categories_name: string;
  country_name: string;
  collection_name: string;
  type:string;
  status: number;
  created_at: string;
  cover_image: string;
  total_count: number;
}

export interface ListMultimediaResponse {
  items: MultimediaRecord[];
  pagination: {
    page: number;
    pageSize: number;
    totalCount: number;
    totalPages: number;
    hasNext: boolean;
    hasPrevious: boolean;
  };
}
