import dbConnector from '../../../../layers/pg/nodejs/dbConnector';
import { CreateCastMemberDbResult, CreateCastMemberRequest } from '../dtos/createCastMember.dto';

export class CreateCastMemberRepository {
  async createCastMember(data: CreateCastMemberRequest): Promise<CreateCastMemberDbResult> {
    const query = 'SELECT * FROM sp_create_cast_member($1, $2)';
    const values = [
      data.name,
      data.photo
    ];

    const result = await dbConnector.query(query, values);

    if (result.rows.length === 0) {
      throw new Error('No se recibió respuesta del stored procedure');
    }

    return result.rows[0] as CreateCastMemberDbResult;
  }
}
