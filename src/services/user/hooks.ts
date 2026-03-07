import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchUser } from "./services";

export const loginKeys = {
  // login: (params: fetchLoginParams) => ["login", params] as const,
  user: () => ["user"] as const,
};

export function getUser() {
  return useQuery({
    queryKey: loginKeys.user(),
    queryFn: () => fetchUser(),
    staleTime: 30 * 1000, // 30 segundos
  });
}