import { GetContentDataDetailRepository } from '../repositories/getContentDataDetail.repo';
import { GetContentDataDetailResponse, mapContentDataDetailResponse } from '../dtos/getContentDataDetail.dto';

export class GetContentDataDetailService {
  private repository: GetContentDataDetailRepository;
  private readonly serviceName = 'GetContentDataDetailService';

  constructor() {
    this.repository = new GetContentDataDetailRepository();
  }

  /**
   * Valida los parámetros de entrada
   * @param contentId - ID del contenido
   */
  private validate(contentId: number): void {
    if (!contentId || contentId <= 0) {
      throw new Error('El ID del contenido es requerido y debe ser mayor a 0');
    }
  }

  /**
   * Obtiene el detalle de un contenido específico
   * @param contentId - ID del contenido a obtener
   */
  async getContentDetail({id}: {id: number}): Promise<GetContentDataDetailResponse> {
    try {
      // Validar parámetros
      this.validate(id);

      // Obtener datos del repositorio (JSON crudo del stored procedure)
      const rawData = await this.repository.getContentDetail(id);
      
      // Mapear la respuesta usando la nueva función que incluye success y message
      return mapContentDataDetailResponse(rawData);
    } catch (error) {
      console.error(`${this.serviceName} - Error al obtener detalle del contenido:`, error);
      // Retornar respuesta de error estructurada
      return {
        success: false,
        message: 'Error interno del servidor al obtener el contenido',
        data: null
      };
    }
  }
}
