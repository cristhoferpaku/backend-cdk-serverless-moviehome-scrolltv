import dbConnector from '../../../../layers/pg/nodejs/dbConnector';
import {
  UpdateResourceDbResult,
  UpdateResourceRequest
} from '../dtos/updateResource.dto';

export class UpdateResourceRepository {
  async updateResource(id: number, data: UpdateResourceRequest): Promise<UpdateResourceDbResult> {
    const query = `
      SELECT * FROM sp_update_resource($1, $2, $3, $4, $5, $6, $7, $8)
    `;

    const values = [
      id,
      data.name || null, 
      data.image || null,
      data.unlinked || null,
      data.downloader || null,
      data.url || null,
      data.state ?? null,
      data.platform_id ?? null,
    ];

    const result = await dbConnector.query(query, values);

    if (result.rows.length === 0) {
      throw new Error('No se recibió respuesta del procedimiento almacenado');
    }

    return result.rows[0] as UpdateResourceDbResult;
  }
}
