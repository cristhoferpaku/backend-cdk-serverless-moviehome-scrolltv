import dbConnector from '../../../../layers/pg/nodejs/dbConnector';
import {
  UpdateMultimediaCategoriesDbResult,
  UpdateMultimediaCategoriesRequest
} from '../dtos/updateMultimediaCategory.dto';

export class UpdateMultimediaCategoriesRepository {
  async updateMultimediaCategories(id: number, data: UpdateMultimediaCategoriesRequest): Promise<UpdateMultimediaCategoriesDbResult> {
    const query = `
      SELECT * FROM sp_update_multimedia_category($1, $2, $3)
    `;

    const values = [
      id,
      data.name || null,
      data.status || null
    ];

    const result = await dbConnector.query(query, values);

    if (result.rows.length === 0) {
      throw new Error('No se recibió respuesta del procedimiento almacenado');
    }

    return result.rows[0] as UpdateMultimediaCategoriesDbResult;
  }
}
