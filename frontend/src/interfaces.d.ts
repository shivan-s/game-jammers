export interface PaginatedResponse {
  next: string;
  previous: string;
  results: any[];
}

export interface User {
  reference_id: string;
  username: string;
  name: string | null;
}
