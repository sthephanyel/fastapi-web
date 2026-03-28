import api from "@/lib/axios";
import type {
  LoginResponse,
  UseRefrash,
  fetchLoginParams,
} from "./types";
import { useAuth, useAuthStore } from "@/store/auth";

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


export async function fetchLoginRefresh(): Promise<{status: Number}>{
  try {
    const { refreshToken } = useAuthStore.getState();
    const { data, status } = await api.post<UseRefrash>(`/refresh?refresh_token=${refreshToken}`);

    useAuthStore.getState().setAuth(
      data.access_token,
      refreshToken
    );

    return {
      'status': status
    }
    
  } catch (error) {
    throw error;
  }
}

export async function fetchLoginRefreshAxios(): Promise<{access_token: String, status: Number}>{
  try {
    const { refreshToken } = useAuthStore.getState();
    const { data, status } = await api.post<UseRefrash>(`/refresh?refresh_token=${refreshToken}`);

    useAuthStore.getState().setAuth(
      data.access_token,
      refreshToken
    );

    console.log('data refresh', data)
    console.log('status refresh', status)
    
    return {
      'access_token': data.access_token,
      'status': status
    }
    
  } catch (error) {
    throw error;
  }
}