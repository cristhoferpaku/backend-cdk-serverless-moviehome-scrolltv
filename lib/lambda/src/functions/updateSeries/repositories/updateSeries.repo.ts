import dbConnector from '../../../../layers/pg/nodejs/dbConnector';
import {
  UpdateSerieDbResult,
  UpdateSerieRequest
} from '../dtos/updateSeries.dto';

export class UpdateSerieRepository {
  async updateSerie(id: number, data: UpdateSerieRequest): Promise<UpdateSerieDbResult> {

    const query = `
      SELECT * FROM sp_update_serie($1, $2, $3 ,$4 , $5 , $6 , $7, $8, $9, $10, $11)
    `;

    const values = [
      id,
      data.title || null,
      data.description || null,
      data.cover_image || null,
      data.category_ids || null,
      data.section_id || null,
      data.country_id || null,
      data.collection_id || null,
      data.status || null,
      data.publish_platform_1 ?? null,
      data.publish_platform_2 ?? null
    ];

    const result = await dbConnector.query(query, values);

    

    if (result.rows.length === 0) {
      throw new Error('No se recibió respuesta del procedimiento almacenado');
    }

    const response = {
      ...result.rows[0],
       publish_platform_1: data.publish_platform_1 ?? null,
       publish_platform_2: data.publish_platform_2 ?? null
    } as UpdateSerieDbResult;
    return response;
  }
}
