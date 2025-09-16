import dbConnector from '../../../../layers/pg/nodejs/dbConnector';
import { CreateLiveTvRequest, CreateLiveTvDbResult } from '../dtos/createLiveTv.dto';
import { logError } from '../../../../layers/utils/nodejs/utils';

const FUNCTION_NAME = 'CreateLiveTvRepository';

export class CreateLiveTvRepository {
  async createLiveTv(data: CreateLiveTvRequest): Promise<CreateLiveTvDbResult> {
    try {
      const query = 'SELECT * FROM sp_create_live_tv($1, $2)';
      const result = await dbConnector.query(query, [
        data.name,
        data.url
      ]);

      if (result.rows.length === 0) {
        throw new Error('No se pudo crear el canal de TV en vivo');
      }

      return {
        id: result.rows[0].id,
        name: result.rows[0].name,
        url: result.rows[0].url,
        created_at: result.rows[0].created_at,
        updated_at: result.rows[0].updated_at,
        success: result.rows[0].success,
        message: result.rows[0].message,
      };
    } catch (error) {
      logError(FUNCTION_NAME, 'Error al crear el canal de TV en vivo', { error });
      throw new Error('Error al crear el canal de TV en vivo');
    }
  }
}