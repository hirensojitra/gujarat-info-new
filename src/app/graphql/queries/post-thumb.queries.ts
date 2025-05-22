// src/app/graphql/queries/post-thumb.queries.ts
import { gql } from 'apollo-angular';

export const GET_POST_THUMBS = gql`
  query GetPostThumbs($postId: ID!) {
    getPostThumbs(postId: $postId) {
      filename
      path
    }
  }
`;
