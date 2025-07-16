import dbConnector from '../../../../layers/pg/nodejs/dbConnector';
import { DeleteResourceDbResult } from '../dtos/deleteResource.dto';

export class DeleteResourceRepository {
  async deleteResource(id: number): Promise<DeleteResourceDbResult> {
    const query = 'SELECT * FROM sp_delete_resource($1)';
    const result = await dbConnector.query(query, [id]);

    if (result.rows.length === 0) {
      throw new Error('No se recibió respuesta del procedimiento almacenado');
    }

    return result.rows[0] as DeleteResourceDbResult;
  }
}
