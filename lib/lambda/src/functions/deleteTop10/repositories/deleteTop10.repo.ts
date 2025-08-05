import dbConnector from '../../../../layers/pg/nodejs/dbConnector';
import { DeleteTop10Response } from '../dtos/deleteTop10.dto';
import { logError } from '../../../../layers/utils/nodejs/utils';

const FUNCTION_NAME = 'DeleteTop10Repository';

export class DeleteTop10Repository {
  async deleteTop10(id: number): Promise<DeleteTop10Response> {
    try {
      const query = 'SELECT * FROM sp_delete_top_10($1)';
      const result = await dbConnector.query(query, [id]);

      if (result.rows.length === 0) {
        throw new Error('Elemento de top10 no encontrado');
      }

      return {
        success: result.rows[0].success,
        message: result.rows[0].message
      };
    } catch (error) {
      logError(FUNCTION_NAME, 'Error al eliminar el elemento de top10', { error });
      throw new Error('Error al eliminar el elemento de top10');
    }
  }
}