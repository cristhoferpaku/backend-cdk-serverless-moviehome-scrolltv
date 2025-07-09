import dbConnector from '../../../../layers/pg/nodejs/dbConnector';
import { ChangePackageTypeStatusRequest, ChangePackageTypeStatusResponse } from '../dtos/changePackageTypeStatus.dto';

export class ChangePackageTypeStatusRepository {
  /**
   * Cambia el status de un package type usando stored procedure
   */
  async changePackageTypeStatus(
    id: number,
    statusData: ChangePackageTypeStatusRequest
  ): Promise<ChangePackageTypeStatusResponse> {

    try {
      const query = `
        SELECT * FROM sp_change_package_type_status($1, $2);
      `;

      const result = await dbConnector.query(query, [id, statusData.status]);

      if (!result.rows || result.rows.length === 0) {
        throw new Error('Error al cambiar el status del package type');
      }

      const row = result.rows[0];

      // Si success es false, lanzamos error con el mensaje
      if (!row.success) {
        throw new Error(row.message || 'Error desconocido al cambiar status');
      }

      return {
        id: row.id,
        name: row.name,
        status: row.status,
        success: row.success,
        message: row.message,
      };
    } catch (error) {
      console.error('Error en changePackageTypeStatus:', error);
      throw error;
    }
  }
} 