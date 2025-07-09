import { GetPackageSellerByIdRepository } from '../repositories/getPackageSellerById.repo';
import { GetPackageSellerByIdResponse } from '../dtos/getPackageSellerById.dto';
import { logInfo, logError } from '../../../../layers/utils/nodejs/utils';

const SERVICE_NAME = 'GetPackageSellerByIdService';

export class GetPackageSellerByIdService {
  private getPackageSellerByIdRepository: GetPackageSellerByIdRepository;

  constructor() {
    this.getPackageSellerByIdRepository = new GetPackageSellerByIdRepository();
  }

  /**
   * Obtiene un paquete vendedor por ID
   */
  async getPackageSellerById(id: number): Promise<GetPackageSellerByIdResponse> {
    logInfo(SERVICE_NAME, 'Iniciando búsqueda de paquete vendedor por ID', { id });

    try {
      // Ejecutar stored procedure
      const result = await this.getPackageSellerByIdRepository.getPackageSellerById(id);
      
      if (!result.success) {
        logError(SERVICE_NAME, result.message, { id });
        // Lanzar error específico para que el handler pueda manejarlo apropiadamente
        throw new Error(result.message);
      }

      // Transformar la respuesta
      const response: GetPackageSellerByIdResponse = {
        id: result.id!,
        name: result.name!,
        credit: result.credit!,
        platformId: result.platform_id,
        platformName: result.platform_name,
        packageTypeId: result.package_type_id!,
        packageTypeName: result.package_type_name!,
        status: result.status!,
        createdAt: result.created_at!.toISOString(),
        updatedAt: result.updated_at!.toISOString(),
        message: result.message
      };

      logInfo(SERVICE_NAME, 'Paquete vendedor obtenido exitosamente', {
        id: response.id,
        name: response.name,
        packageTypeName: response.packageTypeName,
        platformName: response.platformName
      });
      
      return response;
    } catch (error) {
      logError(SERVICE_NAME, error instanceof Error ? error : 'Error desconocido', { id });
      throw error;
    }
  }
} 