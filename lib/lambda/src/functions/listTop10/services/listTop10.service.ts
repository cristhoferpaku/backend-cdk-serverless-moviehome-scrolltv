import {
  ListTop10Response,
  Top10Section
} from '../dtos/listTop10.dto';
import { ListTop10Repository } from '../repositories/listTop10.repo';

const FUNCTION_NAME = 'ListTop10Service';

export class ListTop10Service {
  private repository = new ListTop10Repository();

  async getTop10(): Promise<ListTop10Response> {
    try {
      const sections: Top10Section[] = await this.repository.getTop10();

      // Ordenar el contenido de cada sección por top_number
      sections.forEach(section => {
         if (section.top_content?.length) {
          section.top_content.sort((a, b) => a.top_number - b.top_number);
      }
      });

      return {
        sections
      };
    } catch (error) {
      throw error;
    }
  }
}