import { GetPackageTypeByIdRepository } from '../repositories/getPackageTypeById.repo';
import { GetPackageTypeByIdRequest, GetPackageTypeByIdResponse } from '../dtos/getPackageTypeById.dto';
import { logError } from '../../../../layers/utils/nodejs/utils';

export class GetPackageTypeByIdService {
  private repository: GetPackageTypeByIdRepository;
  private readonly serviceName = 'GetPackageTypeByIdService';

  constructor() {
    this.repository = new GetPackageTypeByIdRepository();
  }

  async getPackageTypeById(requestData: GetPackageTypeByIdRequest): Promise<GetPackageTypeByIdResponse> {
    try {
      // Validaciones de entrada
      this.validateInput(requestData);
      // Ejecutar la búsqueda usando el stored procedure
      const result = await this.repository.getPackageTypeById(requestData.id);
      // Verificar si el stored procedure encontró el registro
      if (!result.success) {
        throw new Error(result.message);
      }
      // Transformar respuesta
      return {
        id: result.id,
        name: result.name,
        status: result.status
      };
    } catch (error) {
      logError(this.serviceName, error instanceof Error ? error : 'Error desconocido', {
        id: requestData.id
      });
      throw error;
    }
  }

  private validateInput(requestData: GetPackageTypeByIdRequest): void {
    if (requestData.id === undefined || requestData.id === null) {
      throw new Error('El ID del tipo de paquete es requerido');
    }
    if (!Number.isInteger(requestData.id) || requestData.id <= 0) {
      throw new Error('El ID del tipo de paquete debe ser un número entero positivo');
    }
  }
} 