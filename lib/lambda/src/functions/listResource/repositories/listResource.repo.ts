import dbConnector from '../../../../layers/pg/nodejs/dbConnector';
import { ListResourceRequest, ResourceItem } from '../dtos/listResource.dto';

const FUNCTION_NAME = 'ListResourceRepository';

export class ListResourceRepository {

  async listResource(params: ListResourceRequest): Promise<ResourceItem[]> {
    try {
      const query = 'SELECT * FROM sp_list_resource($1, $2, $3, $4)';
      const result = await dbConnector.query(query, [
        params.search,
        params.status,
        params.page,
        params.limit,
      ]);
      return result.rows.map((row: any) => ({
        id: row.id,
        name: row.name,
        image: row.image,
        unlinked: row.unlinked,
        downloader: row.downloader,
        url: row.url,
        state: row.state,
        platform_name: row.platform_name,
        created_at: row.created_at,
        updated_at: row.updated_at,
        total_count: row.total_count,
      }));
    } catch (error) {
      throw new Error('Error al obtener los recursos');
    }
  }
}