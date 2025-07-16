import dbConnector from '../../../../layers/pg/nodejs/dbConnector';
import { GetResourceByIdDatabaseResponseDto } from '../dtos/getResourceById.dto';

export class GetResourceByIdRepository {
  async getResourceById(id: number): Promise<GetResourceByIdDatabaseResponseDto> {
    const query = 'SELECT * FROM sp_get_resource_by_id($1)';
    const result = await dbConnector.query(query, [id]);

    if (result.rows.length === 0) {
      throw new Error('No se encontró el recurso o no hubo respuesta del procedimiento');
    }

    return result.rows[0] as GetResourceByIdDatabaseResponseDto;
  }
}