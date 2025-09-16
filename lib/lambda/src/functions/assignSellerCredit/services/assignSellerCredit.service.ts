import { AssignSellerCreditRepository } from '../repositories/assignSellerCredit.repo';
import { AssignSellerCreditRequest, AssignSellerCreditResponse } from '../dtos/assignSellerCredit.dto';

export class AssignSellerCreditService {
  private assignSellerCreditRepo: AssignSellerCreditRepository;

  constructor() {
    this.assignSellerCreditRepo = new AssignSellerCreditRepository();
  }

  /**
   * Asigna créditos de vendedor
   */
  async assignCredit(requestData: AssignSellerCreditRequest): Promise<{success: boolean; data?: AssignSellerCreditResponse;error?: string}> {
    // Validar datos de entrada básicos
    const validationErrors = this.validateRequest(requestData);
    if (validationErrors.length > 0) {
      return {
        success: false,
        error: validationErrors.join(', ')
      };
    }

    // Ejecutar la asignación de crédito directamente
    const result = await this.assignSellerCreditRepo.assignSellerCredit(
      requestData.created_by_admin_id,
      requestData.receiver_admin_id,
      requestData.package_seller_id
    );
    if (!result.success) {
        throw new Error(result.message);
      }
    return {
      success: true,
      data: result
    }
  }

  /**
   * Valida los datos de entrada
   */
  private validateRequest(requestData: AssignSellerCreditRequest): string[] {
    const errors: string[] = [];

    if (!requestData.created_by_admin_id || requestData.created_by_admin_id <= 0) {
      errors.push('ID del administrador que asigna es requerido y debe ser mayor a 0');
    }

    if (!requestData.receiver_admin_id || requestData.receiver_admin_id <= 0) {
      errors.push('ID del administrador receptor es requerido y debe ser mayor a 0');
    }

    if (!requestData.package_seller_id || requestData.package_seller_id <= 0) {
      errors.push('ID del package seller es requerido y debe ser mayor a 0');
    }

    if (requestData.created_by_admin_id === requestData.receiver_admin_id) {
      errors.push('El administrador no puede asignarse crédito a sí mismo');
    }

    return errors;
  }
}