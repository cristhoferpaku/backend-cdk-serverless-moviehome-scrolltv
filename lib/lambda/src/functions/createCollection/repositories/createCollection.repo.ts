import dbConnector from '../../../../layers/pg/nodejs/dbConnector';
import { CreateCollectionsDbResult, CreateCollectionsRequest } from '../dtos/createCollection.dto';

export class CreateCollectionsRepository {
  async createCollections(data: CreateCollectionsRequest): Promise<CreateCollectionsDbResult> {
    const query = 'SELECT * FROM sp_create_collection($1, $2 ,$3)';
    const values = [
      data.name,
      data.section_id,
      data.status
    ];

    const result = await dbConnector.query(query, values);

    if (result.rows.length === 0) {
      throw new Error('No se recibió respuesta del stored procedure');
    }

    return result.rows[0] as CreateCollectionsDbResult;
  }
}
