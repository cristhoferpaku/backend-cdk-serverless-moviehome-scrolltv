export interface ListResourceQueryParams {
  search?: string;
  status?: string;
  page?: string;
  limit?: string;
}

export interface ListResourceRequest {
  search: string | null;
  status: number[] | null;
  page: number;
  limit: number;
}

export interface ResourceItem {
  id: number;
  name: string;
  image: string | null;
  unlinked: string | null;
  downloader: string | null;
  url: string | null;
  state: number;
  platform_name: string;
  created_at: string;
  updated_at: string;
  total_count: number;
}

export interface ListResourceResponse {
  items: ResourceItem[];
  pagination: {
      page: number;
      pageSize: number;
     totalCount: number;
     totalPages: number;
     hasNext: boolean;
     hasPrevious: boolean;
  };
}

