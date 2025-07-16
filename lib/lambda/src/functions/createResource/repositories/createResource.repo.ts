import dbConnector from '../../../../layers/pg/nodejs/dbConnector';
import { CreateResourceRequest, CreateResourceResponse } from '../dtos/createResource.dto';

export class CreateResourceRepository {
  async createResource(request: CreateResourceRequest): Promise<CreateResourceResponse> {
    const query = `
      SELECT * FROM sp_create_resource($1, $2, $3, $4, $5, $6)
    `;
    
    const values = [
      request.name,
      request.image,
      request.unlinked || null,
      request.downloader || null,
      request.url || null,
      request.platform_id
    ];

    const result = await dbConnector.query(query, values);
    return result.rows[0];
  }
}