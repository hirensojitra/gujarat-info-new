// src/app/graphql/queries/language.queries.ts
import { gql } from 'apollo-angular';

export const GET_LANGUAGES = gql`
  query GetLanguages {
    languages {
      id
      name
    }
  }
`;
