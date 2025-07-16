import dbConnector from '../../../../layers/pg/nodejs/dbConnector';
import { GetCastMemberByIdDbResult } from '../dtos/getCastMemberById.dto';

export class GetCastMemberByIdRepository {
  async getCastMemberById(id: number): Promise<GetCastMemberByIdDbResult> {
    const query = 'SELECT * FROM sp_get_cast_member_by_id($1)';
    const result = await dbConnector.query(query, [id]);

    if (result.rows.length === 0) {
      throw new Error('No se encontró el reparto o no hubo respuesta del procedimiento');
    }

    return result.rows[0] as GetCastMemberByIdDbResult;
  }
}
