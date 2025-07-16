export interface UpdateCastMemberRequest {
    name?: string;
    photo?: string;
  }
  
  export interface UpdateCastMemberDbResult {
    id: number;
    name: string;
    photo: string;
    created_at: string;
    updated_at: string;
    success: boolean;
    message: string;
  }
  
  export interface UpdateCastMemberResponse {
    success: boolean;
    message: string;
    data?: Omit<UpdateCastMemberDbResult, 'success' | 'message'>;
  }
  