export interface CollectionContent {
  id: number;
  coverImage: number;
}

export interface GetCollectionContentResponse {
  items: CollectionContent[];
  message: string;

} 