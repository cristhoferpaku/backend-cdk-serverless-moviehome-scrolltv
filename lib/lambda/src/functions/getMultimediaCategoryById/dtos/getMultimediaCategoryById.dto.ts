export interface GetMultimediaCategoriesByIdRequest {
  id: number;
}

export interface GetMultimediaCategoriesByIdResponse {
  success: boolean;
  message: string;
  data?: MultimediaCategoriesData;
}

export interface MultimediaCategoriesData {
  id: number;
  name: string;
  status: number;
  created_at: string;
  updated_at: string;
}

export interface GetMultimediaCategoriesByIdDbResult extends MultimediaCategoriesData {
  success: boolean;
  message: string;
}
