import dbConnector from '../../../../layers/pg/nodejs/dbConnector';
import { SearchContent } from '../dtos/getSearchContent.dto';

export class GetSearchContentRepository {
  
  /**
   * Obtiene todos los SearchContents disponibles usando stored procedure
   */
  async getAllSearchContent(search: string, id_user: number): Promise<SearchContent[]> {
    // Return empty array if search string is empty
    if (!search.trim()) {
      return [];
    }

    const query = `
      SELECT * FROM sp_search_content_by_title($1, $2)
    `;
    const params = [
      search,
      id_user
    ]
    
    const result = await dbConnector.query(query, params);
    return result.rows.map((row: any) => ({
      id: row.content_id,
      coverImage: row.cover_image,
    }));
  }
} 