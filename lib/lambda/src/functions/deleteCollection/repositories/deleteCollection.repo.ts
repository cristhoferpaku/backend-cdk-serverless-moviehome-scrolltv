import dbConnector from '../../../../layers/pg/nodejs/dbConnector';
import { DeleteCollectionsDbResult } from '../dtos/deleteCollection.dto';

export class DeleteCollectionsRepository {
  async deleteCollections(id: number): Promise<DeleteCollectionsDbResult> {
    const query = 'SELECT * FROM sp_delete_collection($1)';
    const result = await dbConnector.query(query, [id]);

    if (result.rows.length === 0) {
      throw new Error('No se recibió respuesta del procedimiento almacenado');
    }

    return result.rows[0] as DeleteCollectionsDbResult;
  }
}
