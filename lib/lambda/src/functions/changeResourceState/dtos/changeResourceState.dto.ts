export interface ChangeResourceStateRequestDto {
  id: number;
  state: number;
}

export interface ChangeResourceStateBody {
  state: number; // 0: inactivo, 1: activo, 2: suspendido
}



export interface ChangeResourceStateDatabaseResponseDto {
  id: number | null;
  name: string | null;
  state: number | null;
  success: boolean;
  message: string;
}