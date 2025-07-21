import dbConnector from '../../../../layers/pg/nodejs/dbConnector';
import { CollectionsRecord, ListCollectionsParams } from '../dtos/listCollections.dto';

const FUNCTION_NAME = 'ListCollectionsRepository';

export class ListCollectionsRepository {
  async getCollections(params: ListCollectionsParams): Promise<CollectionsRecord[]> {
    try {
      const query = 'SELECT * FROM sp_list_collections($1, $2, $3, $4)';
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
        section_id: row.section_id,
        section_name: row.section_name,
        created_at: row.created_at,
        updated_at: row.updated_at,
        total_count: row.total_count,
      }));
    } catch (error) {
      throw new Error('Error al obtener las colecciones');
    }
  }
}
