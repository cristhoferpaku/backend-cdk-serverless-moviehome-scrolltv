import dbConnector from "../../../../layers/pg/nodejs/dbConnector";
import { AssignSellerCreditResponse } from "../dtos/assignSellerCredit.dto";

export class AssignSellerCreditRepository {
  /**
   * Ejecuta la función stored procedure assign_seller_credit
   */
  async assignSellerCredit(
    createdByAdminId: number,
    receiverAdminId: number,
    packageSellerId: number
  ): Promise<AssignSellerCreditResponse> {
    try {
      const query = `SELECT * FROM assign_seller_credit($1, $2, $3)`;
      const result = await dbConnector.query(query, [
        createdByAdminId,
        receiverAdminId,
        packageSellerId,
      ]);
      if (result.rows.length === 0) {
        return {
          success: false,
          message: "No se pudo ejecutar la asignación de crédito",
        };
      }
      const row = result.rows[0];
      return {
        success: row.success,
        message: row.message,
      };
    } catch (error) {
      console.error("Error en assignSellerCredit repository:", error);
      throw new Error("Error al ejecutar la asignación de crédito");
    }
  }
}
