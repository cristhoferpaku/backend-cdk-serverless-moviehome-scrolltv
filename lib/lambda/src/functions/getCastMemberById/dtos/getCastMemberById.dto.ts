export interface GetCastMemberByIdRequest {
  id: number;
}

export interface GetCastMemberByIdResponse {
  success: boolean;
  message: string;
  data?: CastMemberData;
}

export interface CastMemberData {
  id: number;
  name: string;
  photo: string;
  created_at: string;
  updated_at: string;
}

export interface GetCastMemberByIdDbResult extends CastMemberData {
  success: boolean;
  message: string;
}
