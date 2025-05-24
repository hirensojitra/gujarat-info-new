export interface RegisterInput {
  email: string;
  pass_key: string;
}

export interface RegisterPayload {
  token: string;
  user_id: string;
  role_id: string;
  username: string;
  is_email_verified: boolean;
  email_otp_token: string;
  otp_expires_at: string;
}

export interface GoogleAuthPayload {
  token?: string | null;
  userId: string;
  email: string;
  requiresPassword: boolean;
}