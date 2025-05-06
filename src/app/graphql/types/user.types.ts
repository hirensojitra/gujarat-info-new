export interface RegisterInput {
  pass_key: string;
  email: string;
}

export interface RegisterPayload {
  token: string;
  user_id: string;
  role_id: string;
  username: string;
}

export interface User {
  id: string;
  firstname: string;
  lastname: string;
  middlename?: string;
  number: string;
  number_verified: boolean;
  role_id: string;
  created_at: string;
}

export interface LoginInput {
  login_id: string; // email or number
  pass_key: string;
}
