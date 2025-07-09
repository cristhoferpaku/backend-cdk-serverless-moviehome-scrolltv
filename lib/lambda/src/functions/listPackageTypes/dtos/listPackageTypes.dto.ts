export interface ListPackageTypesRequest {
  search?: string;
  page?: number;
  pageSize?: number;
}

export interface PackageTypeItem {
  id: number;
  name: string;
  status: number;
}

export interface ListPackageTypesResponse {
  items: PackageTypeItem[];
  pagination: {
    page: number;
    pageSize: number;
    totalCount: number;
    totalPages: number;
    hasNext: boolean;
    hasPrevious: boolean;
  };
}

export interface ListPackageTypesDatabaseResponse {
  id: number;
  name: string;
  status: number;
  total_count: number;
} 