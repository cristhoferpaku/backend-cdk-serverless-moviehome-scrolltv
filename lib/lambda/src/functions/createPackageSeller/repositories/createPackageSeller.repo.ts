import dbConnector from '../../../../layers/pg/nodejs/dbConnector';
import { CreatePackageSellerRequestDto, CreatePackageSellerDatabaseResponseDto } from '../dtos/createPackageSeller.dto';

export class CreatePackageSellerRepository {

  constructor() {
    // Constructor sin parámetros siguiendo el patrón de otros repositories
  }

  async createPackageSeller(requestDto: CreatePackageSellerRequestDto): Promise<CreatePackageSellerDatabaseResponseDto> {
    console.log('Repository: Iniciando creación de paquete vendedor');
    
    try {
      const query = `
        SELECT * FROM sp_create_package_seller($1, $2, $3, $4, $5)
      `;
      
      const values = [
        requestDto.name,
        requestDto.credit,
        requestDto.package_type_id,
        requestDto.platform_id ,
        requestDto.status || 1
      ];

      console.log('Repository: Ejecutando query con valores:', values);
      
      const result = await dbConnector.query(query, values);
      
      if (!result.rows || result.rows.length === 0) {
        throw new Error('No se pudo crear el paquete vendedor');
      }

      const packageSellerData = result.rows[0];
      console.log('Repository: Resultado del stored procedure:', packageSellerData);
      
      return packageSellerData;
    } catch (error) {
      console.error('Repository: Error al crear paquete vendedor:', error);
      throw error;
    }
  }
} 