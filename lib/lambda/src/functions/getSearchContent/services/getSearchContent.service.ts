import { GetSearchContentRepository } from '../repositories/getSearchContent.repo';
import { GetSearchContentResponse } from '../dtos/getSearchContent.dto';

export class GetSearchContentService {
  private repository: GetSearchContentRepository;

  constructor() {
    this.repository = new GetSearchContentRepository();
  }

  /**
   * Obtiene todos los SearchContent disponibles
   */
  async getAllSearchContent( search: string, id_user: number): Promise<GetSearchContentResponse> {
    try {
      const SearchContent = await this.repository.getAllSearchContent(search, id_user);

      //
      const response: GetSearchContentResponse = {
        items: SearchContent ,
        message: `Se encontraron ${SearchContent.length} contenidos disponible(s)`
      };
      return response;

    } catch (error) {
      throw error;
    }
  }
} 