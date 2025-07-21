import dbConnector from '../../../../layers/pg/nodejs/dbConnector';
import { CreateMultimediaCategoriesDbResult, CreateMultimediaCategoriesRequest } from '../dtos/createMultimediaCategory.dto';

export class CreateMultimediaCategoriesRepository {
  async createMultimediaCategories(data: CreateMultimediaCategoriesRequest): Promise<CreateMultimediaCategoriesDbResult> {
    const query = 'SELECT * FROM sp_create_multimedia_category($1, $2)';
    const values = [
      data.name,
      data.status
    ];

    const result = await dbConnector.query(query, values);

    if (result.rows.length === 0) {
      throw new Error('No se recibió respuesta del stored procedure');
    }

    return result.rows[0] as CreateMultimediaCategoriesDbResult;
  }
}
