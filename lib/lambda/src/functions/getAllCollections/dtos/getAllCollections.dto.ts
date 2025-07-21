export interface Collections {
  id: number;
  name: string;
}

export interface GetCollectionsResponse {
  items: Collections[];
  message: string;
} 