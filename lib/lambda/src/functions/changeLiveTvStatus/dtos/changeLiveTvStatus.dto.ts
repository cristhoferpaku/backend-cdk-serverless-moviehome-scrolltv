export interface ChangeLiveTvStateRequestDto {
  id: number;
  status: number;
}

export interface ChangeLiveTvStateBody {
  status: number; // 0: inactivo, 1: activo
}



export interface ChangeLiveTvStateDatabaseResponseDto {
  id: number | null;
  name: string | null;
  url : string | null;
  status: number | null;
  success: boolean;
  message: string;
}