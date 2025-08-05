import dbConnector from '../../../../layers/pg/nodejs/dbConnector';
import { MultimediaRecord, ListMultimediaParams } from '../dtos/listMultimedia.dto';

const FUNCTION_NAME = 'ListMultimediaRepository';

export class ListMultimediaRepository {
  async getMultimedia(params: ListMultimediaParams): Promise<MultimediaRecord[]> {
    try {
      const query = 'SELECT * FROM sp_list_multimedia($1, $2, $3, $4, $5)';
      const result = await dbConnector.query(query, [
        params.search,
        params.status,
        params.type,
        params.page,
        params.limit,
      ]);

      return result.rows.map((row: any) => ({
        id: row.id,
        title: row.title,
        section_name: row.section_name,
        categories_name: row.categories_list,
        country_name: row.country_name,
        collection_name: row.collection_name,
        type: row.type,
        status: row.status,
        created_at: row.created_at,
        cover_image: row.cover_image,
        total_count: row.total_count,
      }));
    } catch (error) {
      throw new Error(`Error getting multimedia: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }
}
