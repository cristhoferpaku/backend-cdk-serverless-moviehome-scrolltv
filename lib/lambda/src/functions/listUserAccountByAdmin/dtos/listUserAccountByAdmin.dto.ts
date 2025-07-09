export interface ListUserAccountsQueryParams {
    user_admin_id: number;
    search?: string;
    status?: string; // Ej: "1,2"
    page?: string;
    limit?: string;
  }
  
  export interface ListUserAccountsParams {
    user_admin_id: number;
    search: string | null;
    status: number[] | null;
    page: number;
    pageSize: number;
  }
  
  export interface UserAccountRecord {
    id: number;
    username: string;
    platform_name: string;
    package_name: string;
    status: number;
    service_started: boolean;
    start_date: string;
    expiration_date: string;
    can_change_package: boolean;
    created_at: string;
    total_count: number;
  }
  
  export interface ListUserAccountsResponse {
    items: UserAccountRecord[];
    pagination: {
      currentPage: number;
      totalPages: number;
      totalItems: number;
      itemsPerPage: number;
      hasNextPage: boolean;
      hasPreviousPage: boolean;
    };
  }
  