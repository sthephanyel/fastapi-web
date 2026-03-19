export interface fetchLoginParams {
  username?: string;
  email?: string;
  password?: string;
}

export interface LoginResponse {
  access_token: string;
  refresh_token: string;
  token_type: string;
}

export interface UseRefrash {
    access_token: string;
    token_type: string;
}