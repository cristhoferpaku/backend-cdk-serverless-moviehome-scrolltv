import dbConnector from '../../../../layers/pg/nodejs/dbConnector';

export class GetContentDataDetailRepository {
  
  /**
   * Obtiene el detalle de contenido usando stored procedure
   * @param contentId - ID del contenido a obtener
   * @returns JSON crudo del stored procedure
   */
  async getContentDetail(contentId: number): Promise<any> {
    const query = `
      SELECT * FROM sp_get_content_detail($1);
    `;

    const { rows } = await dbConnector.query(query, [contentId]);
    const raw = rows[0]?.sp_get_content_detail; // ← nombre exacto de la columna
    const payload = typeof raw === 'string' ? JSON.parse(raw) : raw;
    return payload ?? {};
  }
}