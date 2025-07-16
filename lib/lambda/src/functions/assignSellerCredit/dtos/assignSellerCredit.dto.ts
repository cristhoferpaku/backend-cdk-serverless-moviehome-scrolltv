export interface AssignSellerCreditRequest {
  created_by_admin_id: number;
  receiver_admin_id: number;
  package_seller_id: number;
}

export interface AssignSellerCreditResponse {
  success: boolean;
  message: string;
}
