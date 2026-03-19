import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchLoginParams } from "./types";
import { fetchLogin, fetchLoginRefresh } from "./services";

export const loginKeys = {
  // login: (params: fetchLoginParams) => ["login", params] as const,
  login: () => ["login"] as const,
  refresh: () => ["refresh"] as const,
};

// export function useLogin(params: fetchLoginParams = {}) {
//   return useQuery({
//     queryKey: loginKeys.login(params),
//     queryFn: () => fetchLogin(params),
//     staleTime: 30 * 1000, // 30 segundos
//   });
// }

export function useLogin() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (params: fetchLoginParams) => fetchLogin(params),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey:loginKeys.login() });
    },
  });
}

export function useRefresh() {
  return useQuery({
    queryKey: loginKeys.refresh(),
    queryFn: () => fetchLoginRefresh(),
    staleTime: 30 * 1000, // 30 segundos
  });
}