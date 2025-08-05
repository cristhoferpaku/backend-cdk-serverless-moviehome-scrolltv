import * as bcrypt from 'bcryptjs';
import {
  CreateRevendedorRequest,
  CreateRevendedorResponse
} from '../dtos/createRevendedor.dto';
import { CreateRevendedorRepository } from '../repositories/createRevendedor.repo';
import { logError } from '../../../../layers/utils/nodejs/utils';

const FUNCTION_NAME = 'CreateRevendedorService';

export class CreateRevendedorService {
  private repository = new CreateRevendedorRepository();

  async createRevendedor(data: CreateRevendedorRequest, vendedor_id: number): Promise<CreateRevendedorResponse> {
    try {
      // Validaciones básicas
      if (!data.username?.trim()) {
        throw new Error('El nombre de usuario es requerido');
      }

      if (!data.password?.trim()) {
        throw new Error('La contraseña es requerida');
      }

      if (!data.phone?.trim()) {
        throw new Error('El teléfono es requerido');
      }

      if (vendedor_id === undefined || vendedor_id === null) {
        throw new Error('El ID del vendedor es requerido');
      }

      if (vendedor_id <= 0) {
        throw new Error('El ID del vendedor debe ser un número positivo');
      }

      // Validar longitud mínima de contraseña
      if (data.password.length < 6) {
        throw new Error('La contraseña debe tener al menos 6 caracteres');
      }

      // Validar crédito
      if (data.credit === undefined || data.credit === null) {
        throw new Error('El crédito es requerido');
      }

      if (data.credit <= 0) {
        throw new Error('El crédito debe ser un número positivo');
      }

      // Hash de la contraseña
      const saltRounds = 12;
      const hashedPassword = await bcrypt.hash(data.password, saltRounds);

      // Actualizar el objeto data con la contraseña hasheada
      const dataWithHashedPassword = {
        ...data,
        password: hashedPassword
      };

      return await this.repository.createRevendedor(dataWithHashedPassword, vendedor_id);
    } catch (error) {
      logError(FUNCTION_NAME, 'Error al crear el revendedor', { error });
      throw error;
    }
  }
}