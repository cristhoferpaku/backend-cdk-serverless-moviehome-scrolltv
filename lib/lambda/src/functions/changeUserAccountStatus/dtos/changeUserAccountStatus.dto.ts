export interface ChangeUserAccountStatusRequest {
    id: number;
    status: number;
  }
  
  export interface ChangeUserAccountStatusResponse {
    success: boolean;
    message: string;
    data?: {
      id: number;
      username: string;
      status: number;
    };
  }
  
  export interface ChangeUserAccountStatusDbResult {
    id: number | null;
    username: string | null;
    status: number | null;
    success: boolean;
    message: string;
  }
  