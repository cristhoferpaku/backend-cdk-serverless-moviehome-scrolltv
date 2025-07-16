export interface CreateCastMemberRequest {
    name: string;
    photo: string;
  }
  
  export interface CreateCastMemberResponse {
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
  
  export interface CreateCastMemberDbResult {
    id: number;
    name: string;
    photo: string;
    created_at: string;
    updated_at: string;
    success: boolean;
    message: string;
  }
  