import dbConnector from '../../../../layers/pg/nodejs/dbConnector';
import { CollectionContent } from '../dtos/getCollectionContent.dto';

export class GetCollectionContentRepository {
  
  /**
   * Obtiene todos los CollectionContents disponibles usando stored procedure
   */
  async getAllCollectionContent(id: number, id_user: number): Promise<CollectionContent[]> {
    const query = `
      SELECT * FROM sp_get_collection_content($1, $2)
    `;
    const params = [
      id,
      id_user 
    ]
    const result = await dbConnector.query(query, params);
      return result.rows.map((row: any) => ({
        id: row.content_id,
        coverImage: row.cover_image,
      }));
  }
} 