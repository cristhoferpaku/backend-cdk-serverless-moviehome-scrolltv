import dbConnector from '../../../../layers/pg/nodejs/dbConnector';
import { GetMultimediaCategoriesByIdDbResult } from '../dtos/getMultimediaCategoryById.dto';

export class GetMultimediaCategoriesByIdRepository {
  async getMultimediaCategoriesById(id: number): Promise<GetMultimediaCategoriesByIdDbResult> {
    const query = 'SELECT * FROM sp_get_multimedia_category_by_id($1)';
    const result = await dbConnector.query(query, [id]);

    if (result.rows.length === 0) {
      throw new Error('No se encontró la categoría o no hubo respuesta del procedimiento');
    }

    return result.rows[0] as GetMultimediaCategoriesByIdDbResult;
  }
}
