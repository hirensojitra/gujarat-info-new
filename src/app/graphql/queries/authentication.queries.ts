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
export const HAS_ROLE = gql`
  query HasRole($user_id: String!, $role_code: String!) {
    hasRole(user_id: $user_id, role_code: $role_code)
  }
`;
