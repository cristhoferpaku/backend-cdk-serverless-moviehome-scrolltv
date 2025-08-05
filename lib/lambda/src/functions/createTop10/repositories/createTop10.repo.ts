import dbConnector from '../../../../layers/pg/nodejs/dbConnector';
import { CreateTop10Request, CreateTop10Response } from '../dtos/createTop10.dto';
import { logError } from '../../../../layers/utils/nodejs/utils';

const FUNCTION_NAME = 'CreateTop10Repository';

export class CreateTop10Repository {
  async createTop10(data: CreateTop10Request): Promise<CreateTop10Response> {
    try {
      const query = 'SELECT * FROM sp_create_top_10($1, $2, $3)';
      const result = await dbConnector.query(query, [
        data.contend_id,
        data.section_id,
        data.top_number
      ]);

      if (result.rows.length === 0) {
        throw new Error('No se pudo crear el elemento de top10');
      }

      return {
        id: result.rows[0].id,
        top_number: result.rows[0].top_number,
        success: result.rows[0].success,
        message: result.rows[0].message,
      };
    } catch (error) {
      logError(FUNCTION_NAME, 'Error al crear el elemento de top10', { error });
      throw new Error('Error al crear el elemento de top10');
    }
  }
}