export interface MultimediaCategories {
  id: number;
  name: string;
}

export interface GetMultimediaCategoriesResponse {
  items: MultimediaCategories[];
  message: string;
} 