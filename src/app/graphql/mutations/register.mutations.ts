import { gql } from 'apollo-angular';

export const REGISTER_USER = gql`
  mutation RegisterUser($input: RegisterInput!) {
    register(input: $input) {
      token
      user_id
      role_id
      username
      is_email_verified
      email_otp_token
      otp_expires_at
    }
  }
`;

export const VERIFY_EMAIL_OTP = gql`
  mutation VerifyEmailOtp($token: String!, $otp_code: String!) {
    verifyEmailOtp(token: $token, otp_code: $otp_code)
  }
`;
