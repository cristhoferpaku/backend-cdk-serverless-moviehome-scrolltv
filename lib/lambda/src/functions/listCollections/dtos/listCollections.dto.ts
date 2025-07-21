export interface ListCollectionsQueryParams {
  search?: string;
  status?: string; // Ej: "1,2"
  page?: string;
  limit?: string;
}

export interface ListCollectionsParams {
  search: string | null;
  status: number[] | null;
  page: number;
  pageSize: number;
}

export interface CollectionsRecord {
  id: number;
  name: string;
  status: number;
  section_id: number;
  section_name: string;
  created_at: string;
  updated_at: string;
  total_count: number;
}

export interface ListCollectionsResponse {
  items: CollectionsRecord[];
  pagination: {
    page: number;
    pageSize: number;
    totalCount: number;
    totalPages: number;
    hasNext: boolean;
    hasPrevious: boolean;
  };
}
