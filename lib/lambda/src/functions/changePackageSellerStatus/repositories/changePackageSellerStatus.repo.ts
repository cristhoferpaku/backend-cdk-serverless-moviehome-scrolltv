import dbConnector from '../../../../layers/pg/nodejs/dbConnector';
import { ChangePackageSellerStatusDbResult } from '../dtos/changePackageSellerStatus.dto';

/**
 * Repository para el cambio de status de paquete vendedor
 */
export class ChangePackageSellerStatusRepository {

  /**
   * Cambia el status de un paquete vendedor específico
   * @param id - ID del paquete vendedor
   * @param status - Nuevo status
   * @returns Resultado de la operación con información del paquete actualizado
   */
  async changePackageSellerStatus(id: number, status: number): Promise<ChangePackageSellerStatusDbResult | null> {
    const query = 'SELECT * FROM sp_change_package_seller_status($1, $2)';
    const values = [id, status];

    const result = await dbConnector.query(query, values);
    
    if (result.rows && result.rows.length > 0) {
      return result.rows[0] as ChangePackageSellerStatusDbResult;
    }

    return null;
  }
} 