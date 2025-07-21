import dbConnector from '../../../../layers/pg/nodejs/dbConnector';
import { ChangeCollectionsStatusDatabaseResponseDto } from '../dtos/changeCollectionStatus.dto';

export class ChangeCollectionsStatusRepository {
  async changeCollectionsStatus(id: number, status: number): Promise<ChangeCollectionsStatusDatabaseResponseDto> {
    const query = 'SELECT * FROM sp_change_collection_status($1, $2)';
    const result = await dbConnector.query(query, [id, status]);

    if (result.rows.length === 0) {
      throw new Error('No se pudo cambiar el estado de la colección o no hubo respuesta del procedimiento');
    }

    return result.rows[0] as ChangeCollectionsStatusDatabaseResponseDto;
  }
}