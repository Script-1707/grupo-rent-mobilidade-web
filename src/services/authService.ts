// Serviço de autenticação para login
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000/api';

export interface LoginPayload {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  user: {
    email: string;
    password: string;
  };
}

export async function login(payload: LoginPayload): Promise<LoginResponse> {
  const response = await axios.post(`${API_URL}/login`, payload);
  return response.data;
}
