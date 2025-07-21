import dbConnector from '../../../../layers/pg/nodejs/dbConnector';
import {
  UpdateCollectionsDbResult,
  UpdateCollectionsRequest
} from '../dtos/updateCollection.dto';

export class UpdateCollectionsRepository {
  async updateCollections(id: number, data: UpdateCollectionsRequest): Promise<UpdateCollectionsDbResult> {
    const query = `
      SELECT * FROM sp_update_collection($1, $2, $3 ,$4)
    `;

    const values = [
      id,
      data.name || null,
      data.section_id || null,
      data.status || null
    ];

    const result = await dbConnector.query(query, values);

    if (result.rows.length === 0) {
      throw new Error('No se recibió respuesta del procedimiento almacenado');
    }

    return result.rows[0] as UpdateCollectionsDbResult;
  }
}
