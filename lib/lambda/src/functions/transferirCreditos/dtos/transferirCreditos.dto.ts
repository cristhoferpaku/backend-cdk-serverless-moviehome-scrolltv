export interface TransferirCreditosRequest {
  revendedor_id: number;
  cantidad: number;
}

export interface TransferirCreditosResponse {
  success: boolean;
  message: string;
}