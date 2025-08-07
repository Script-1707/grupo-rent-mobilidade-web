// Serviço de autenticação para login
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000/api';
const LOGIN_URL = `${API_URL}/auth/login`;

export interface LoginPayload {
  email: string;
  password: string;
}

export interface LoginResponse {
  success: boolean;
  message: string;
  token: string;
}


export async function login(payload: LoginPayload, token?: string): Promise<LoginResponse> {
  const options = {
    method: 'POST',
    url: LOGIN_URL,
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {})
    },
    data: payload
  };
  const { data } = await axios.request(options);
  return {
    success: data.success,
    message: data.message,
    token: data.token
  };
}

export async function loginAdmin(): Promise<LoginResponse> {
  return login({ email: 'admin@evgrupo.com', password: 'password' });
}
