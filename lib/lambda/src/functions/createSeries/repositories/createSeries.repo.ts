import dbConnector from '../../../../layers/pg/nodejs/dbConnector';
import { CreateSerieDbResult, CreateSerieRequest } from '../dtos/createSeries.dto';

export class CreateSerieRepository {
  async createSerie(data: CreateSerieRequest): Promise<CreateSerieDbResult> {
    const query = 'SELECT * FROM sp_create_serie($1, $2 ,$3 ,$4, $5, $6, $7, $8, $9, $10)';


    const values = [
      data.title,
      data.description,
      data.category_ids,
      data.section_id,
      data.country_id,
      data.collection_id,
      data.cover_image,
      data.banner_image,
      data.publish_platform_1,
      data.publish_platform_2
    ];

    const result = await dbConnector.query(query, values);

    if (result.rows.length === 0) {
      throw new Error('No se recibió respuesta del stored procedure');
    }

    return result.rows[0] as CreateSerieDbResult;
  }
}
