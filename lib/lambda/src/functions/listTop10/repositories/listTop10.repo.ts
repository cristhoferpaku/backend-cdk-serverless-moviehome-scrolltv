import dbConnector from '../../../../layers/pg/nodejs/dbConnector';
import { Top10Section, TopContent } from '../dtos/listTop10.dto';

const FUNCTION_NAME = 'ListTop10Repository';

export class ListTop10Repository {
  async getTop10(): Promise<Top10Section[]> {
    try {
      const query = 'SELECT * FROM sp_list_top_10()';
      const result = await dbConnector.query(query);

      // Agrupar los resultados por section_id
      const sectionsMap = new Map<number, Top10Section>();

      result.rows.forEach((row: any) => {
        const sectionId = row.section_id;
        const sectionName = row.section_name;
        let topContentArray = [];
        try {
          if (row.top_content && typeof row.top_content === 'object') {
            topContentArray = Array.isArray(row.top_content) ? row.top_content : [row.top_content];
          } else if (row.top_content && typeof row.top_content === 'string' && row.top_content.trim() !== '') {
            topContentArray = JSON.parse(row.top_content);
          }
        } catch (error) {
          console.error(`Error parsing top_content for section ${sectionId}:`, error);
          topContentArray = [];
        }

        if (!sectionsMap.has(sectionId)) {
          sectionsMap.set(sectionId, {
            section_id: sectionId,
            section_name: sectionName,
            top_content: []
          });
        }

        // Si hay contenido top, agregarlo a la sección
     topContentArray.forEach((item: any) => {
    if (item) {
      const topContent: TopContent = {
        id: item.id,
        content_id: item.content_id,
        title: item.title,
        type: item.type,
        cover_image: item.cover_image,
        top_number: item.top_number,
        created_at: item.created_at,
        updated_at: item.updated_at
      };
      sectionsMap.get(sectionId)!.top_content.push(topContent);
    }
  });
      });

      // Convertir el Map a array y ordenar por section_id
      return Array.from(sectionsMap.values()).sort((a, b) => a.section_id - b.section_id);
    } catch (error) {
      throw new Error(`Error al obtener el top10: ${error instanceof Error ? error.message : String(error)}`);
    }
  }
}