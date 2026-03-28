export interface FetchMovesParams {
  search?: string;
  offset?: number;
  limit?: number;
  orderColumn?: number;
  orderDir?: "asc" | "desc";
}

export interface MovesListItem {
  modificado: string;
  title: string;
  criado: string;
  velocidade: number;
  status: string;
  text: string;
  id: number;
  voice: string;
  user_id: number;
  time_request: string;
}

export interface MovesListResponse {
  items: MovesListItem[];
  totalCount: number;
}