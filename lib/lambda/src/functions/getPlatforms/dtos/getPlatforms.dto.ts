export interface Platform {
  id: number;
  name: string;
}

export interface GetPlatformsResponse {
  items: Platform[];
  total: number;
  message: string;
} 