import api from "@/lib/axios";
import type { fetchUserReponse } from "./types";
import { useAuthStore } from "@/store/auth";

export async function fetchUser(): Promise<fetchUserReponse>{
  try {
    const { data } = await api.get<fetchUserReponse>("/users/me");

    const response = {
        "id": data.id,
        "full_name": data.full_name,
        "disabled": data.disabled,
        "username": data.username,
        "email": data.email
      }
    useAuthStore.getState().setUser(response);
    return response;
    
  } catch (error) {
    throw error;
  }
}