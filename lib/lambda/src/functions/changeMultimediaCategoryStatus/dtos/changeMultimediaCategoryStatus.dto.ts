export interface ChangeMultimediaCategoriesStatusRequestDto {
  id: number;
  status: number;
}

export interface ChangeMultimediaCategoriesStatusBody {
  status: number; // 0: inactivo, 1: activo
}

export interface ChangeMultimediaCategoriesStatusDatabaseResponseDto {
  id: number | null;
  name: string | null;
  status: number | null;
  success: boolean;
  message: string;
}