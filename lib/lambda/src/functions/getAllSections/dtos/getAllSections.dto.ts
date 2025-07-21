export interface Sections {
  id: number;
  name: string;
}

export interface GetSectionsResponse {
  items: Sections[];
  message: string;
} 