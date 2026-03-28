import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchMoves } from "./services";
import { FetchMovesParams } from "./types";

export const movesKeys = {
  all: ["moves"] as const,
  list: (params: FetchMovesParams) =>
    [...movesKeys.all, "list", params] as const,
};

export function useMovesHistory(params: FetchMovesParams = {}) {
  return useQuery({
    queryKey: movesKeys.list(params),
    queryFn: () => fetchMoves(params),
    staleTime: 30 * 1000, // 30 segundos
  });
}