export interface CreateResourceRequest {
  name: string;
  image: string;
  unlinked?: string;
  downloader?: string;
  url?: string;
  platform_id: number;
}

export interface CreateResourceResponse {
  id: number;
  name: string;
  image: string;
  unlinked: string | null;
  downloader: string | null;
  url: string | null;
  platform_id: number;
  status: number;
  created_at: string;
  updated_at: string;
  success: boolean;
  message: string;
}

export interface CreateResourceResult {
  success: boolean;
  data?: CreateResourceResponse;
  message: string;
}