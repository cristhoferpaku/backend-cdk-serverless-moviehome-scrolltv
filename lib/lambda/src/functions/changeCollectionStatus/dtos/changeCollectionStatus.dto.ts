export interface ChangeCollectionsStatusRequestDto {
  id: number;
  status: number;
}

export interface ChangeCollectionsStatusBody {
  status: number; // 0: inactivo, 1: activo
}

export interface ChangeCollectionsStatusDatabaseResponseDto {
  id: number | null;
  name: string | null;
  status: number | null;
  success: boolean;
  message: string;
}