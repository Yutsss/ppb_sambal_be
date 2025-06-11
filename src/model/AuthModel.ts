import { Request } from "express";

export interface User {
  id: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  accessToken: string;
}

export interface TokenPayload {
  userId: string;
}

export interface AuthRequest extends Request {
  user: User;
}
