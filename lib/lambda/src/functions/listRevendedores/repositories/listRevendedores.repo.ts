import dbConnector from '../../../../layers/pg/nodejs/dbConnector';
import { ListRevendedoresRequest, RevendedoresItem } from '../dtos/listRevendedores.dto';

const FUNCTION_NAME = 'ListRevendedoresRepository';

export class ListRevendedoresRepository {

  async listRevendedores(params: ListRevendedoresRequest, idUser: number): Promise<RevendedoresItem[]> {
    try {
      const query = 'SELECT * FROM sp_list_revendedores($1, $2, $3, $4, $5)';
      const result = await dbConnector.query(query, [
        idUser,
        params.search,
        params.status,
        params.page,
        params.limit,
      ]);
      return result.rows.map((row: any) => ({
        id: row.id,
        username: row.username,
        credit: row.credit,
        status: row.status,
        created_at: row.created_at,
        total_count: row.total_count,
      }));
    } catch (error) {
      throw new Error('Error al obtener los recursos');
    }
  }
}