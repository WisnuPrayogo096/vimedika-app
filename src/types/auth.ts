import { ApiResponse } from "./common";

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface LoginResponse {
  data: ApiResponse<string>;
  message: string;
}