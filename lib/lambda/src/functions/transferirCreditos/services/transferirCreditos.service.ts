import {
  TransferirCreditosRequest,
  TransferirCreditosResponse
} from '../dtos/transferirCreditos.dto';
import { TransferirCreditosRepository } from '../repositories/transferirCreditos.repo';
import { logError } from '../../../../layers/utils/nodejs/utils';

const FUNCTION_NAME = 'TransferirCreditosService';

export class TransferirCreditosService {
  private repository = new TransferirCreditosRepository();

  async transferirCreditos(data: TransferirCreditosRequest, vendedor_id: number): Promise<TransferirCreditosResponse> {
    try {
      // Validaciones básicas
      if (!data.revendedor_id || data.revendedor_id <= 0) {
        throw new Error('El ID del revendedor debe ser un número positivo');
      }

      if (!data.cantidad || data.cantidad <= 0) {
        throw new Error('La cantidad debe ser un número positivo');
      }


      return await this.repository.createRevendedor(data, vendedor_id);
    } catch (error) {
      logError(FUNCTION_NAME, 'Error al crear el revendedor', { error });
      throw error;
    }
  }
}