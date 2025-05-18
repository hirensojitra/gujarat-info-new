import { gql } from 'apollo-angular';

export const CREATE_POST_SUBCATEGORIES = gql`
  mutation CreatePostSubcategories($subcategories: [PostSubcategoryInput!]!) {
    createPostSubcategories(subcategories: $subcategories) {
      id
      name
      description
      category_id
    }
  }
`;

export const UPDATE_POST_SUBCATEGORIES = gql`
  mutation UpdatePostSubcategories(
    $subcategories: [UpdatePostSubcategoryInput!]!
  ) {
    updatePostSubcategories(subcategories: $subcategories) {
      id
      name
      description
      category_id
    }
  }
`;

export const SOFT_DELETE_POST_SUBCATEGORY = gql`
  mutation SoftDeletePostSubcategory($id: ID!) {
    softDeletePostSubcategory(id: $id) {
      id
      name
    }
  }
`;

export const SOFT_DELETE_POST_SUBCATEGORIES = gql`
  mutation SoftDeletePostSubcategories($ids: [ID!]!) {
    softDeletePostSubcategories(ids: $ids) {
      id
      name
    }
  }
`;
export const HARD_DELETE_POST_SUBCATEGORY = gql`
  mutation HardDeletePostSubcategory($id: ID!) {
    hardDeletePostSubcategory(id: $id)
  }
`;

export const HARD_DELETE_POST_SUBCATEGORIES = gql`
  mutation HardDeletePostSubcategories($ids: [ID!]!) {
    hardDeletePostSubcategories(ids: $ids)
  }
`;

export const RESTORE_POST_SUBCATEGORY = gql`
  mutation RestorePostSubcategory($id: ID!) {
    restorePostSubcategory(id: $id) {
      id
      name
    }
  }
`;

export const RESTORE_POST_SUBCATEGORIES = gql`
  mutation RestorePostSubcategories($ids: [ID!]!) {
    restorePostSubcategories(ids: $ids) {
      id
      name
    }
  }
`;
