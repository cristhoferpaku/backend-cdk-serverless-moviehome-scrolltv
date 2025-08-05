import dbConnector from '../../../../layers/pg/nodejs/dbConnector';
import { UserAccountRecord, ListUserAccountsParams } from '../dtos/listUserAccountByAdmin.dto';
import { logInfo, logError } from '../../../../layers/utils/nodejs/utils';

const FUNCTION_NAME = 'ListUserAccountsRepository';

export class ListUserAccountsRepository {
  async getUserAccounts(params: ListUserAccountsParams): Promise<UserAccountRecord[]> {
    try {
      logInfo(FUNCTION_NAME, 'Ejecutando sp_list_user_account', params);

      const query = 'SELECT * FROM sp_list_user_account_by_admin ($1, $2, $3, $4, $5, $6)';
      const result = await dbConnector.query(query, [
        params.user_admin_id,
        params.search,
        params.status,
        params.year,
        params.page,
        params.pageSize,
      ]);

      return result.rows.map((row: any) => ({
        id: row.id,
        username: row.username,
        platform_name: row.platform_name,
        package_name: row.package_name,
        status: row.status,
        service_started: row.service_started,
        start_date: row.start_date,
        expiration_date: row.expiration_date,
        can_change_package: row.can_change_package,
        created_at: row.created_at,
        total_count: row.total_count,
      }));
    } catch (error) {
      throw new Error('Error al obtener las cuentas de usuario');
    }
  }
}
