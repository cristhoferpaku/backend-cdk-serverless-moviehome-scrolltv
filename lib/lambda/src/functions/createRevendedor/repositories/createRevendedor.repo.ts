import dbConnector from '../../../../layers/pg/nodejs/dbConnector';
import { CreateRevendedorRequest, CreateRevendedorResponse } from '../dtos/createRevendedor.dto';

const FUNCTION_NAME = 'CreateRevendedorRepository';

export class CreateRevendedorRepository {
  async createRevendedor(data: CreateRevendedorRequest , vendedor_id:number): Promise<CreateRevendedorResponse> {
    try {
      const query = 'SELECT * FROM sp_create_revendedor($1, $2, $3, $4, $5)';
      const result = await dbConnector.query(query, [
        data.username,
        data.password,
        data.phone,
        vendedor_id,
        data.credit,
      ]);

      if (result.rows.length === 0) {
        throw new Error('No se pudo crear el revendedor');
      }

      const row = result.rows[0];
      return {
        success: row.success,
        message: row.message,
      };
    } catch (error) {
      throw new Error('Error al crear el revendedor');
    }
  }
}