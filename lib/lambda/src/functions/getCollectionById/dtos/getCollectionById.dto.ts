export interface GetCollectionsByIdRequest {
  id: number;
}

export interface GetCollectionsByIdResponse {
  success: boolean;
  message: string;
  data?: CollectionsData;
}

export interface CollectionsData {
  id: number;
  name: string;
  section_id: number;
  section_name: string;
  status: number;
  created_at: string;
  updated_at: string;
}

export interface GetCollectionsByIdDbResult extends CollectionsData {
  success: boolean;
  message: string;
}
