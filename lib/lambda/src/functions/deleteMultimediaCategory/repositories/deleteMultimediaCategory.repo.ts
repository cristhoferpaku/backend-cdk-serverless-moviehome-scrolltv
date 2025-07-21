import dbConnector from '../../../../layers/pg/nodejs/dbConnector';
import { DeleteMultimediaCategoriesDbResult } from '../dtos/deleteMultimediaCategory.dto';

export class DeleteMultimediaCategoriesRepository {
  async deleteMultimediaCategories(id: number): Promise<DeleteMultimediaCategoriesDbResult> {
    const query = 'SELECT * FROM sp_delete_multimedia_category($1)';
    const result = await dbConnector.query(query, [id]);

    if (result.rows.length === 0) {
      throw new Error('No se recibió respuesta del procedimiento almacenado');
    }

    return result.rows[0] as DeleteMultimediaCategoriesDbResult;
  }
}
