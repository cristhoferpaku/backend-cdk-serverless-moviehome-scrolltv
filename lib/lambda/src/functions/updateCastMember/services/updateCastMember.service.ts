import {
    UpdateCastMemberRequest,
    UpdateCastMemberResponse
  } from '../dtos/updateCastMember.dto';
  import { UpdateCastMemberRepository } from '../repositories/updateCastMember.repo';
  
  const FUNCTION_NAME = 'UpdateCastMemberService';
  
  export class UpdateCastMemberService {
    private repository = new UpdateCastMemberRepository();
  
    async updateCastMember(id: number, data: UpdateCastMemberRequest): Promise<UpdateCastMemberResponse> {
      try {
        if (!id || id <= 0) throw new Error('ID inválido');
        if (!data || Object.keys(data).length === 0) throw new Error('No se proporcionaron datos a actualizar');
        const result = await this.repository.updateCastMember(id, data);
        if (!result.success) {
          return { success: false, message: result.message };
        }
        const { success, message, ...rest } = result;
        return {
          success: true,
          message,
          data: rest
        };
      } catch (error) {
        return {
          success: false,
          message: error instanceof Error ? error.message : 'Error interno del servidor'
        };
      }
    }
  }
  