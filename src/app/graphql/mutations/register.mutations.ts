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
    verifyEmailOtp(token: $token, otp_code: $otp_code) {
      token
      user {
        id
        firstname
        middlename
        lastname
        email
        email_verified
        username
        role_id
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
export const RESEND_EMAIL_OTP = gql`
  mutation ResendEmailOtp($email: String!) {
    resendEmailOtp(email: $email) {
      email_otp_token
      otp_expires_at
    }
  }
`;
