import dbConnector from '../../../../layers/pg/nodejs/dbConnector';
import { GetCollectionsByIdDbResult } from '../dtos/getCollectionById.dto';

export class GetCollectionsByIdRepository {
  async getCollectionsById(id: number): Promise<GetCollectionsByIdDbResult> {
    const query = 'SELECT * FROM sp_get_collection_by_id($1)';
    const result = await dbConnector.query(query, [id]);

    if (result.rows.length === 0) {
      throw new Error('No se encontró la colección o no hubo respuesta del procedimiento');
    }

    return result.rows[0] as GetCollectionsByIdDbResult;
  }
}
