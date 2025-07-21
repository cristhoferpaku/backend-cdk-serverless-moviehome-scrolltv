import dbConnector from '../../../../layers/pg/nodejs/dbConnector';
import { ChangeMultimediaCategoriesStatusDatabaseResponseDto } from '../dtos/changeMultimediaCategoryStatus.dto';

export class ChangeMultimediaCategoriesStatusRepository {
  async changeMultimediaCategoriesStatus(id: number, status: number): Promise<ChangeMultimediaCategoriesStatusDatabaseResponseDto> {
    const query = 'SELECT * FROM sp_change_multimedia_category_status($1, $2)';
    const result = await dbConnector.query(query, [id, status]);

    if (result.rows.length === 0) {
      throw new Error('No se pudo cambiar el estado de la categoria o no hubo respuesta del procedimiento');
    }

    return result.rows[0] as ChangeMultimediaCategoriesStatusDatabaseResponseDto;
  }
}