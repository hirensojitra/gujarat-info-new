// src/app/graphql/types/reset-password.types.ts

import { AuthPayload, UserPublicInfo } from './login.types';

/**
 * Response payload for requesting a password-reset OTP.
 */
export interface ResetOtpPayload {
  reset_otp_token: string;
  otp_expires_at: string;
}

/**
 * GraphQL mutation result for requestPasswordReset
 */
export interface RequestPasswordResetMutation {
  requestPasswordReset: ResetOtpPayload;
}

/**
 * Input shape for resetPasswordByOtp
 */
export interface ResetPasswordByOtpInput {
  token: string;
  otp_code: string;
  new_pass_key: string;
}

/**
 * GraphQL mutation result for resetPasswordByOtp
 */
export interface ResetPasswordByOtpMutation {
  resetPasswordByOtp: AuthPayload;
}
