export interface SearchContent {
  id: number;
  coverImage: number;
}

export interface GetSearchContentResponse {
  items: SearchContent[];
  message: string;

} 