import { GetCollectionContentRepository } from '../repositories/getCollectionContent.repo';
import { GetCollectionContentResponse } from '../dtos/getCollectionContent.dto';

export class GetCollectionContentService {
  private repository: GetCollectionContentRepository;

  constructor() {
    this.repository = new GetCollectionContentRepository();
  }

  /**
   * Obtiene todos los CollectionContent disponibles
   */
  async getAllCollectionContent( id: number, id_user: number): Promise<GetCollectionContentResponse> {
    try {
      const CollectionContent = await this.repository.getAllCollectionContent(id, id_user);

      //
      const response: GetCollectionContentResponse = {
        items: CollectionContent ,
        message: `Se encontraron ${CollectionContent.length} contenidos disponible(s)`
      };
      return response;

    } catch (error) {
      throw error;
    }
  }
} 