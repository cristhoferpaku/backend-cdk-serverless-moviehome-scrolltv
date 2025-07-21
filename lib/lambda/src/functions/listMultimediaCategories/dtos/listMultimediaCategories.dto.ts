export interface ListMultimediaCategoriesQueryParams {
    search?: string;
    status?: string; // Ej: "1,2"
    page?: string;
    limit?: string;
  }
  
  export interface ListMultimediaCategoriesParams {
    search: string | null;
    status: number[] | null;
    page: number;
    pageSize: number;
  }
  
  export interface MultimediaCategoriesRecord {
    id: number;
    name: string;
    status: number;
    created_at: string;
    total_count: number;
  }
  
  export interface ListMultimediaCategoriesResponse {
    items: MultimediaCategoriesRecord[];
    pagination: {
      page: number;
  pageSize: number;
  totalCount: number;
  totalPages: number;
  hasNext: boolean;
  hasPrevious: boolean;
    };
  }
  