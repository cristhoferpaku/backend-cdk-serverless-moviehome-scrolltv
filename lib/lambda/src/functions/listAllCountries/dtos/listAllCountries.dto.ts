export interface Country {
  id: number;
  name: string;
}

export interface GetCountryResponse {
  items: Country[];
  message: string;
} 