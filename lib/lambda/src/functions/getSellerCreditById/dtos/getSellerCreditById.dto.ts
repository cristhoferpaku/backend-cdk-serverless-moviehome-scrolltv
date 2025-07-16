export interface GetCredit {
  credit: string;
}

export interface GetSellerCreditByIdResponse {
  credit: GetCredit;
  success: boolean;
  message: string;
} 