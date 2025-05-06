// src/app/graphql/types/update-user.types.ts

import { Gender, MaritalStatus, Language, UserPublicInfo } from './login.types';

export interface UpdateUserInput {
  firstname?: string;
  middlename?: string;
  lastname?: string;
  number?: string;
  birthday?: string; // ISO date, e.g. "1980-04-23"
  gender?: Gender;
  marital_status?: MaritalStatus;
  language_id?: string;
}

export interface UpdateUserProfileResponse {
  updateUserProfile: UserPublicInfo;
}

export interface UpdateUserProfileVariables {
  input: UpdateUserInput;
}

export interface GetCurrentUserResponse {
  validateToken: {
    user: UserPublicInfo;
  };
}
