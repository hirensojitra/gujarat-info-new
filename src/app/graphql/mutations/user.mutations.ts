import { gql } from 'apollo-angular';

export const REGISTER_USER = gql`
  mutation RegisterUser($input: RegisterInput!) {
    registerUser(input: $input) {
      token
      user_id
      role_id
      username
    }
  }
`;

export const LOGIN_USER = gql`
  mutation Login($input: LoginInput!) {
    login(input: $input) {
      token
      user_id
      role_id
      username
    }
  }
`;