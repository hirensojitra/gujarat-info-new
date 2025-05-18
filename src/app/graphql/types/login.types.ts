// src/app/graphql/types/login.types.ts

export enum Gender {
  MALE = 'MALE',
  FEMALE = 'FEMALE',
  NONBINARY = 'NONBINARY',
  OTHER = 'OTHER',
}

export enum MaritalStatus {
  SINGLE = 'SINGLE',
  MARRIED = 'MARRIED',
  DIVORCED = 'DIVORCED',
  WIDOWED = 'WIDOWED',
}

export interface Language {
  id: string;
  name: string;
}

export interface UserPublicInfo {
  id: string;
  firstname: string | null;
  middlename: string | null;
  image: string | null;
  lastname: string | null;
  number: string | null;
  number_verified: boolean;
  role_id: string;
  email: string;
  email_verified: boolean;
  username: string | null;
  birthday: string | null;
  gender: Gender | null;
  marital_status: MaritalStatus | null;
  language: Language;
}

export interface LoginInput {
  login_id: string;
  pass_key: string;
}

export interface LoginPayload {
  token: string;
  user: UserPublicInfo;
}
