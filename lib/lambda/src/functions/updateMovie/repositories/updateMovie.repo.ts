import dbConnector from '../../../../layers/pg/nodejs/dbConnector';
import {
  UpdateMovieDbResult,
  UpdateMovieRequest
} from '../dtos/updateMovie.dto';

export class UpdateMovieRepository {
  async updateMovie(id: number, data: UpdateMovieRequest): Promise<UpdateMovieDbResult> {

    const query = `
      SELECT * FROM sp_update_movie($1, $2, $3 ,$4 ,$5 , $6 , $7, $8, $9, $10, $11, $12, $13, $14 , $15)
    `;

    const values = [
      id,
      data.title || null,
      data.description || null,
      data.cover_image || null,
      data.banner_image || null,
      data.category_ids || null,
      data.section_id || null,
      data.country_id || null,
      data.collection_id || null,
      data.duration_mins || null,
      data.video_url || null,
      data.status || null,
      data.cast_ids ?? null,
      data.publish_platform_1 ?? null,
      data.publish_platform_2 ?? null
    ];

    const result = await dbConnector.query(query, values);

    if (result.rows.length === 0) {
      throw new Error('No se recibió respuesta del procedimiento almacenado');
    }

    return result.rows[0] as UpdateMovieDbResult;
  }
}
