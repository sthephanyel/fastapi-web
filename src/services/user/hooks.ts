import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchUser } from "./services";

export const useKeys = {
  // login: (params: fetchLoginParams) => ["login", params] as const,
  user: () => ["user"] as const,
};

export function getUser() {
  return useQuery({
    queryKey: useKeys.user(),
    queryFn: () => fetchUser(),
    staleTime: 30 * 1000, // 30 segundos
  });
}