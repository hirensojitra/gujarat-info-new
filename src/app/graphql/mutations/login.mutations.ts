// src/app/graphql/mutations/login.mutations.ts

import { gql } from 'apollo-angular';

export const LOGIN_USER = gql`
  mutation LoginUser($input: LoginInput!) {
    login(input: $input) {
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
