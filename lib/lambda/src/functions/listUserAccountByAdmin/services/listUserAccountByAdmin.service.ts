import {
    ListUserAccountsParams,
    ListUserAccountsQueryParams,
    ListUserAccountsResponse,
    UserAccountRecord
  } from '../dtos/listUserAccountByAdmin.dto';
  import { ListUserAccountsRepository } from '../repositories/listUserAccountByAdmin.repo';
  import { logError, logInfo } from '../../../../layers/utils/nodejs/utils';
  
  const FUNCTION_NAME = 'ListUserAccountsService';
  
  export class ListUserAccountsService {
    private repository = new ListUserAccountsRepository();
  
    async getUserAccounts(queryParams: ListUserAccountsQueryParams): Promise<ListUserAccountsResponse> {
      try {
        const params = this.processQueryParams(queryParams);
  
        const users: UserAccountRecord[] = await this.repository.getUserAccounts(params);
        const totalItems = users.length > 0 ? users[0].total_count : 0;
        const totalPages = Math.ceil(totalItems / params.pageSize);
  
        return {
          items: users,
          pagination: {
            page: params.page,
            pageSize: params.pageSize,
            totalCount: totalItems,
            totalPages,
            hasNext: params.page < totalPages,
            hasPrevious: params.page > 1,
          }
        };
      } catch (error) {
        throw new Error('Error al obtener las cuentas de usuario');
      }
    }
  
    private processQueryParams(query: ListUserAccountsQueryParams): ListUserAccountsParams {
      const search = query.search?.trim() || null;
  
      let status: number[] | null = null;
      if (query.status) {
        try {
          const statusArray = query.status
            .split(',')
            .map((v) => parseInt(v.trim()))
            .filter((n) => !isNaN(n));
          status = statusArray.length > 0 ? statusArray : null;
        } catch {
          status = null;
        }
      }
  
      const page = Math.max(1, parseInt(query.page || '1') || 1);
      const pageSize = Math.min(100, Math.max(1, parseInt(query.limit || '10') || 10));
  
      return { user_admin_id: query.user_admin_id, search, status, page, pageSize };
    }
  }
  