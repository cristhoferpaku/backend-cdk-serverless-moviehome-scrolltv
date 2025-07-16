import { CreateCastMemberRepository } from '../repositories/createCastMember.repo';
import {
  CreateCastMemberRequest,
  CreateCastMemberResponse
} from '../dtos/createCastMember.dto';

const FUNCTION_NAME = 'CreateCastMemberService';

export class CreateCastMemberService {
  private repository: CreateCastMemberRepository;

  constructor() {
    this.repository = new CreateCastMemberRepository();
  }

  async createCastMember(data: CreateCastMemberRequest): Promise<CreateCastMemberResponse> {
    try {
      this.validate(data);

      const dbResult = await this.repository.createCastMember(data);

      if (dbResult.success) {
        return {
          success: true,
          message: dbResult.message,
          data: {
            id: dbResult.id,
            name: dbResult.name,
            photo: dbResult.photo,
            created_at: dbResult.created_at,
            updated_at: dbResult.updated_at
          }
        };
      }

      return {
        success: false,
        message: dbResult.message
      };

    } catch (error) {
     
      return {
        success: false,
        message: error instanceof Error ? error.message : 'Error interno del servidor'
      };
    }
  }

  private validate(data: CreateCastMemberRequest): void {
    if (!data.name || data.name.trim().length === 0) {
      throw new Error('El nombre de usuario es requerido');
    }
    if (!data.photo || data.photo.trim().length === 0) {
      throw new Error('La foto es requerida');
    } 
  }
}
