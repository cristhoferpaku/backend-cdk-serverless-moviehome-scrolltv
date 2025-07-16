import dbConnector from '../../../../layers/pg/nodejs/dbConnector';
import {
  UpdateCastMemberDbResult,
  UpdateCastMemberRequest
} from '../dtos/updateCastMember.dto';

export class UpdateCastMemberRepository {
  async updateCastMember(id: number, data: UpdateCastMemberRequest): Promise<UpdateCastMemberDbResult> {
    const query = `
      SELECT * FROM sp_update_cast_member($1, $2, $3)
    `;

    const values = [
      id,
      data.name || null,
      data.photo || null
    ];

    const result = await dbConnector.query(query, values);

    if (result.rows.length === 0) {
      throw new Error('No se recibió respuesta del procedimiento almacenado');
    }

    return result.rows[0] as UpdateCastMemberDbResult;
  }
}
