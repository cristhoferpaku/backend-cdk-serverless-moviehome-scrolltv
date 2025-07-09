import dbConnector from '../../../../layers/pg/nodejs/dbConnector';
import { logError, logInfo } from '../../../../layers/utils/nodejs/utils';
import { PackageTypeActiveRecord } from '../dtos/listPackageTypesActive.dto';

const FUNCTION_NAME = 'ListPackageTypesActiveRepository';

/**
 * Repository para gestionar operaciones de base de datos de tipos de paquetes activos
 */
export class ListPackageTypesActiveRepository {

  /**
   * Obtiene todos los tipos de paquetes activos usando sp_list_package_types_active
   */
  async getActivePackageTypes(): Promise<PackageTypeActiveRecord[]> {
    try {
      logInfo(FUNCTION_NAME, 'Ejecutando sp_list_package_types_active');

      const query = 'SELECT * FROM sp_list_package_types_active()';
      const result = await dbConnector.query(query);

      logInfo(FUNCTION_NAME, 'Tipos de paquetes activos obtenidos exitosamente', {
        count: result.rows.length,
      });

      return result.rows.map((row: any) => ({
        id: row.id,
        name: row.name,
      }));

    } catch (error) {
      logError(FUNCTION_NAME, error instanceof Error ? error : new Error('Error desconocido'), {
        operation: 'getActivePackageTypes',
      });
      throw new Error('Error al obtener los tipos de paquetes activos');
    }
  }
} 