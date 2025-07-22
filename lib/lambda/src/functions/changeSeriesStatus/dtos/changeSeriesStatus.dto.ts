export interface ChangeSerieStatusRequestDto {
  id: number;
  status: number;
}

export interface ChangeSerieStatusBody {
  status: number; // 0: inactivo, 1: activo
}

export interface ChangeSerieStatusDatabaseResponseDto {
  id: number | null;
  name: string | null;
  status: number | null;
  success: boolean;
  message: string;
}