import dbConnector from '../../../../layers/pg/nodejs/dbConnector';
import { DeleteCastMemberDbResult } from '../dtos/deleteCastMember.dto';

export class DeleteCastMemberRepository {
  async deleteCastMember(id: number): Promise<DeleteCastMemberDbResult> {
    const query = 'SELECT * FROM sp_delete_cast_member($1)';
    const result = await dbConnector.query(query, [id]);

    if (result.rows.length === 0) {
      throw new Error('No se recibió respuesta del procedimiento almacenado');
    }

    return result.rows[0] as DeleteCastMemberDbResult;
  }
}
