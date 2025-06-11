export interface CreateUserRequest {
  name: string;
  email: string;
  password: string;
}

export interface CreateUserResponse {
  name: string;
  email: string;
}

export interface GetUserResponse {
  id: string;
  name: string;
  email: string;
}



