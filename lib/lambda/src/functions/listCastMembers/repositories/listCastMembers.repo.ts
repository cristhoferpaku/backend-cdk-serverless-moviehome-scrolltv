import dbConnector from '../../../../layers/pg/nodejs/dbConnector';
import { ListCastMemberRequest, CastMemberItem } from '../dtos/listCastMembers.dto';

const FUNCTION_NAME = 'ListCastMemberRepository';

export class ListCastMemberRepository {

  async listCastMember(params: ListCastMemberRequest): Promise<CastMemberItem[]> {
    try {
      const query = 'SELECT * FROM sp_list_cast_members($1, $2, $3)';
      const result = await dbConnector.query(query, [
        params.search,
        params.page,
        params.limit,
      ]);
      return result.rows.map((row: any) => ({
        id: row.id,
        name: row.name,
        photo: row.photo,
        created_at: row.created_at,
        updated_at: row.updated_at,
        total_count: row.total_count
      }));
    } catch (error) {
      throw new Error('Error al obtener el reparto');
    }
  }
}