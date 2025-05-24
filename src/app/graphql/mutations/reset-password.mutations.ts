// src/app/graphql/mutations/reset-password.mutations.ts

import { gql } from 'apollo-angular';

/**
 * Step 1: Request a reset OTP by email
 */
export const REQUEST_PASSWORD_RESET = gql`
  mutation RequestPasswordReset($email: String!) {
    requestPasswordReset(email: $email) {
      reset_otp_token
      otp_expires_at
    }
  }
`;

/**
 * Step 2: Reset password by OTP
 */
export const RESET_PASSWORD_BY_OTP = gql`
  mutation ResetPasswordByOtp(
    $token: String!
    $otp_code: String!
    $new_pass_key: String!
  ) {
    resetPasswordByOtp(
      token: $token
      otp_code: $otp_code
      new_pass_key: $new_pass_key
    ) {
      token
      user {
        id
        firstname
        middlename
        lastname
        number
        number_verified
        role_id
        email
        email_verified
        username
        birthday
        gender
        marital_status
        language {
          id
          name
        }
      }
    }
  }
`;
