// src/app/graphql/mutations/post-thumb.mutations.ts
import { gql } from 'apollo-angular';

export const UPLOAD_POST_THUMBS = gql`
  mutation UploadPostThumbs($postId: ID!, $thumbnails: [Upload!]!) {
    uploadPostThumbs(postId: $postId, thumbnails: $thumbnails) {
      filename
      path
    }
  }
`;

export const DELETE_POST_THUMBS = gql`
  mutation DeletePostThumbs($postId: ID!, $filenames: [String!]!) {
    deletePostThumbs(postId: $postId, filenames: $filenames)
  }
`;

export const UPDATE_POST_THUMBS = gql`
  mutation UpdatePostThumbs(
    $postId: ID!
    $updates: [PostThumbUpdateInput!]!
  ) {
    updatePostThumbs(postId: $postId, updates: $updates) {
      filename
      path
    }
  }
`;
