import dbConnector from '../../../../layers/pg/nodejs/dbConnector';
import { CreateMovieDbResult, CreateMovieRequest } from '../dtos/createMovie.dto';

export class CreateMovieRepository {
  async createMovie(data: CreateMovieRequest): Promise<CreateMovieDbResult> {
    const query = 'SELECT * FROM sp_create_movie($1, $2 ,$3 ,$4, $5, $6, $7, $8, $9, $10, $11, $12)';


    const values = [
      data.title,
      data.description,
      data.category_ids,
      data.section_id,
      data.country_id,
      data.collection_id,
      data.duration_mins,
      data.cover_image,
      data.video_url,
      data.cast_ids,
      data.publish_platform_1,
      data.publish_platform_2
    ];

    const result = await dbConnector.query(query, values);

    if (result.rows.length === 0) {
      throw new Error('No se recibió respuesta del stored procedure');
    }

    return result.rows[0] as CreateMovieDbResult;
  }
}
