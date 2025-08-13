// src/app/graphql/mutations/post-detail.mutations.ts
import { gql } from 'apollo-angular';

export const ADD_POST = gql`
  mutation AddPost($input: PostInput!) {
    addPost(input: $input) {
      id
      deleted
      info
      info_show
      h
      w
      title
      backgroundurl
      download_counter
      published
      track
      data
      msg
      apiData
      image
      created_at
      updated_at
      deleted_at
    }
  }
`;

export const UPDATE_POST = gql`
  mutation UpdatePost($input: PostUpdateInput!) {
    updatePost(input: $input) {
      id
      deleted
      h
      w
      title
      info
      info_show
      backgroundurl
      data
      download_counter
      published
      track
      subcategory_id
      category {
        id
        name
      }
      subcategory {
        id
        name
      }
      apiData
    }
  }
`;

export const SOFT_DELETE_POST = gql`
  mutation SoftDeletePost($id: String!) {
    softDeletePost(id: $id)
  }
`;

export const RECOVER_POST = gql`
  mutation RecoverPost($id: String!) {
    recoverPost(id: $id)
  }
`;

export const HARD_DELETE_POST = gql`
  mutation HardDeletePost($id: String!) {
    hardDeletePost(id: $id)
  }
`;

export const UPLOAD_THUMBNAIL = gql`
  mutation UploadThumbnail($postId: String!, $file: Upload!) {
    uploadThumbnail(postId: $postId, file: $file)
  }
`;
