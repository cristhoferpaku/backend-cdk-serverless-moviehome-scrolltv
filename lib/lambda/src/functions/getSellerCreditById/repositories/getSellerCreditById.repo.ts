import dbConnector from '../../../../layers/pg/nodejs/dbConnector';
import { GetCredit } from '../dtos/getSellerCreditById.dto';

export class GetSellerCreditByIdRepository {
  
  /**
   * Obtiene todas las plataformas disponibles usando stored procedure
   */
  async  getSellerCreditById( id: number): Promise<GetCredit> {
    const query = `
      SELECT * FROM get_seller_credit_by_id($1)
    `;
    const result = await dbConnector.query(query, [id]);

    if (result.rows.length === 0) {
      throw new Error(' no hubo respuesta del procedimiento');     
    }
    return result.rows[0] as GetCredit;
  }
} 