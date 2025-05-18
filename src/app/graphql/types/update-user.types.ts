// src/app/graphql/types/update-user.types.ts

import { Gender, MaritalStatus, Language, UserPublicInfo } from './login.types';

export interface UpdateUserInput {
  firstname?: string;
  middlename?: string;
  lastname?: string;
  number?: string;
  birthday?: string;
  gender?: Gender;
  marital_status?: MaritalStatus;
  language_id?: string;
}

export interface UpdateUserProfileResponse {
  updateUserProfile: UserPublicInfo;
}

export interface UpdateUserProfileVariables {
  input: UpdateUserInput;
  image?: File;
}

export interface GetCurrentUserResponse {
  validateToken: {
    user: UserPublicInfo;
  };
}
