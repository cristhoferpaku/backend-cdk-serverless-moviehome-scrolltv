import dbConnector from '../../../../layers/pg/nodejs/dbConnector';
import { ListLiveTvRequest, ListLiveTvDbResult } from '../dtos/listLiveTv.dto';
import { logError } from '../../../../layers/utils/nodejs/utils';

const FUNCTION_NAME = 'ListLiveTvRepository';

export class ListLiveTvRepository {
  async listLiveTv(data: ListLiveTvRequest): Promise<ListLiveTvDbResult[]> {
    try {
      const query = 'SELECT * FROM sp_list_live_tv($1, $2, $3 , $4)';
      const result = await dbConnector.query(query, [
        data.search_name || null,
        data.status || null,
        data.page || 1,
        data.page_size || 10
      ]);

      return result.rows.map((row: any) => ({
        id: row.id,
        name: row.name,
        url: row.url,
        status: row.status,
        created_at: row.created_at,
        updated_at: row.updated_at,
        total_count: parseInt(row.total_count)
      }));
    } catch (error) {
      logError(FUNCTION_NAME, 'Error al listar canales de TV en vivo', { error });
      throw new Error('Error al listar canales de TV en vivo');
    }
  }
}