export interface ChangeMovieStatusRequestDto {
  id: number;
  status: number;
}

export interface ChangeMovieStatusBody {
  status: number; // 0: inactivo, 1: activo
}

export interface ChangeMovieStatusDatabaseResponseDto {
  id: number | null;
  name: string | null;
  status: number | null;
  success: boolean;
  message: string;
}