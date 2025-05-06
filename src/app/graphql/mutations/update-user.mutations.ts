// src/app/graphql/mutations/update-user.mutations.ts

import { gql } from 'apollo-angular';

export const UPDATE_USER_PROFILE = gql`
  mutation UpdateUserProfile($input: UpdateUserInput!) {
    updateUserProfile(input: $input) {
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
`;
