import dbConnector from '../../../../layers/pg/nodejs/dbConnector';
import { ValidateServiceExpirationDbResult, ValidateServiceExpirationRequest } from '../dtos/validateServiceExpiration.dto';

export class ValidateServiceExpirationRepository {
  async validateServiceExpiration(data: ValidateServiceExpirationRequest): Promise<ValidateServiceExpirationDbResult> {
    const query = 'SELECT * FROM sp_finish_service_comprobate($1, $2)';
    const values = [data.user_id , data.p_device_id];

    const result = await dbConnector.query(query, values);

    if (result.rows.length === 0) {
      throw new Error('No se recibió respuesta del stored procedure');
    }

    return result.rows[0] as ValidateServiceExpirationDbResult;
  }
}
