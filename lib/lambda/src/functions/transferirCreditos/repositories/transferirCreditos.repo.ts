import dbConnector from '../../../../layers/pg/nodejs/dbConnector';
import { TransferirCreditosRequest, TransferirCreditosResponse } from '../dtos/transferirCreditos.dto';
    
const FUNCTION_NAME = 'TransferirCreditosRepository';

export class TransferirCreditosRepository {
  async createRevendedor(data: TransferirCreditosRequest , vendedor_id:number): Promise<TransferirCreditosResponse> {
    try {
      const query = 'SELECT * FROM sp_transferir_creditos($1, $2, $3)';
      const result = await dbConnector.query(query, [
        vendedor_id,
        data.revendedor_id,
        data.cantidad,
      ]);

      if (result.rows.length === 0) {
        throw new Error('No se pudo transferir los créditos');
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