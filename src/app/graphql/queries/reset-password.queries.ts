import { gql } from 'apollo-angular';
import { UserPublicInfo } from '../types/login.types';

/**
 * Optional: Validate a JWT, returning a fresh AuthPayload.
 */
export const VALIDATE_TOKEN = gql`
  query ValidateToken($token: String) {
    validateToken(token: $token) {
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