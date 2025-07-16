import { ListCastMemberRepository } from '../repositories/listCastMembers.repo';
import { ListCastMemberRequest, ListCastMemberResponse, CastMemberItem,ListCastMemberQueryParams } from '../dtos/listCastMembers.dto';

export class ListCastMemberService {
  private repository: ListCastMemberRepository;

  constructor() {
    this.repository = new ListCastMemberRepository();
  }

  async listCastMember(queryParams: ListCastMemberQueryParams): Promise<ListCastMemberResponse> {
    try {
      const params = this.processQueryParams(queryParams);
  
        const CastMember: CastMemberItem[] = await this.repository.listCastMember(params);
        const totalItems = CastMember.length > 0 ? CastMember[0].total_count : 0;
        const totalPages = Math.ceil(totalItems / params.limit);
  
        return {
          items: CastMember,
          pagination: {
            currentPage: params.page,
            totalPages,
            totalItems,
            itemsPerPage: params.limit,
            hasNextPage: params.page < totalPages,
            hasPreviousPage: params.page > 1,
          }
        }
      
    } catch (error) {
      console.error('Error en ListCastMemberService.listCastMember:', error);
      throw error;
    }
  }

    private processQueryParams(query: ListCastMemberQueryParams): ListCastMemberRequest {
      const search = query.search?.trim() || null;
      const page = Math.max(1, parseInt(query.page || '1') || 1);
      const limit = Math.min(100, Math.max(1, parseInt(query.limit || '10') || 10));
  
      return { search, page, limit };
    }
}