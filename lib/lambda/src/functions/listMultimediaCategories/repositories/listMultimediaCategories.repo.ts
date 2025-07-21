import dbConnector from '../../../../layers/pg/nodejs/dbConnector';
import { MultimediaCategoriesRecord, ListMultimediaCategoriesParams } from '../dtos/listMultimediaCategories.dto';

const FUNCTION_NAME = 'ListMultimediaCategoriesRepository';

export class ListMultimediaCategoriesRepository {
  async getMultimediaCategories(params: ListMultimediaCategoriesParams): Promise<MultimediaCategoriesRecord[]> {
    try {
      const query = 'SELECT * FROM sp_list_multimedia_categories($1, $2, $3, $4)';
      const result = await dbConnector.query(query, [
        params.search,
        params.status,
        params.page,
        params.pageSize,
      ]);

      return result.rows.map((row: any) => ({
        id: row.id,
        name: row.name,
        status: row.status,
        created_at: row.created_at,
        total_count: row.total_count,
      }));
    } catch (error) {
      throw new Error('Error al obtener las categorias multimedia');
    }
  }
}
