import api from "@/lib/axios";
import type {
  LoginResponse,
  fetchLoginParams,
} from "./types";
import { useAuthStore } from "@/store/auth";

export async function fetchLogin(data: fetchLoginParams): Promise<LoginResponse> {
  try {
    const {
      email,
      password,
      username
    } = data;
    if (!email && !password && !username) {
      throw {
        response: {
          data: {
            message: "Necessário preencher os campos.",
          },
        },
      };
    }
    const formData = new FormData();
    formData.append("email", email || "");
    formData.append("password", password || "");
    formData.append("username", username || "");

    const { data: response, status } = await api.post<LoginResponse>("/login", formData);
    
    console.log('status', status)
    console.log('response', response)
    
    if ( status != 200
        && !response.access_token
        && !response.refresh_token
        && !response.token_type
      ) {
      throw {
        response: {
          data: {
            detail: "Erro ao fazer login.",
          },
        },
      };
    }
    useAuthStore.getState().setAuth(
      response.access_token,
      response.refresh_token
    );
    return {
      'access_token': response.access_token,
      'refresh_token': response.refresh_token,
      'token_type': response.token_type
    }

  } catch (error) {
    throw error;
  }
}
