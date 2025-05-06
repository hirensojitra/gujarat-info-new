import { gql } from 'apollo-angular';

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
      }
    }
  }
`;
