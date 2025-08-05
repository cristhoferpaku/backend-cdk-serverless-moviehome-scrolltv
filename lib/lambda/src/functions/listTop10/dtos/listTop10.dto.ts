export interface TopContent {
  id: number;
  content_id: number;
  title: string;
  type: string;
  cover_image: string;
  top_number: number;
  created_at: string;
  updated_at: string;
}

export interface Top10Section {
  section_id: number;
  section_name: string;
  top_content: TopContent[];
}

export interface ListTop10Response {
  sections: Top10Section[];
}