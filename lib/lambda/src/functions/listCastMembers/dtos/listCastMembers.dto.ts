

export interface ListCastMemberQueryParams {
  search?: string;
  page?: string;
  limit?: string;
}

export interface ListCastMemberRequest {
  search: string | null;
  page: number;
  limit: number;
}

export interface CastMemberItem { 
  id: number;
  name: string;
  photo: string;
  created_at: string;
  updated_at: string;
  total_count: number;
}

export interface ListCastMemberResponse {
  items: CastMemberItem[];
  pagination: {
      currentPage: number;
      totalPages: number;
      totalItems: number;
      itemsPerPage: number;
      hasNextPage: boolean;
      hasPreviousPage: boolean;
  };
}

