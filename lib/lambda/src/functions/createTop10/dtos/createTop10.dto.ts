export interface CreateTop10Request {
  contend_id: number;
  section_id: number;
  top_number: number;
}

export interface CreateTop10Response {
  id: number;
  top_number: number;
  success: number;
  message: string;
}



