// update-user.mutations.ts

import { gql } from 'apollo-angular';

export const UPDATE_USER_PROFILE = gql`
  mutation UpdateUserProfile($input: UpdateUserInput!, $image: Upload) {
    updateUserProfile(input: $input, image: $image) {
      id
      firstname
      lastname
      middlename
      email
      number
      number_verified
      gender
      birthday
      marital_status
      role_id
      language {
        id
        name
      }
    }
  }
`;
