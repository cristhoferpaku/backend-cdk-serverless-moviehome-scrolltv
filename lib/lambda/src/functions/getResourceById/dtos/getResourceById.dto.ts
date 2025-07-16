export interface GetResourceByIdRequestDto {
  id: number;
}

export interface GetResourceByIdResponseDto {
  id: number;
  name: string;
  image: string | null;
  unlinked: string | null;
  downloader: string | null;
  url: string | null;
  state: number;
  platform_id: number;
  platform_name: string;
  created_at: string;
  updated_at: string;
}

export interface GetResourceByIdServiceResponseDto {
  success: boolean;
  resource: GetResourceByIdResponseDto;
}

export interface GetResourceByIdDatabaseResponseDto {
  id: number | null;
  name: string | null;
  image: string | null;
  unlinked: string | null;
  downloader: string | null;
  url: string | null;
  state: number | null;
  platform_id: number | null;
  platform_name: string | null;
  created_at: string | null;
  updated_at: string | null;
  success: boolean;
  message: string;
}