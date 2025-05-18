// post-category.mutations.ts

export const CREATE_POST_CATEGORIES = `
  mutation CreatePostCategories($postCategories: [PostCategoryInput!]!) {
    createPostCategories(postCategories: $postCategories) {
      id
      name
      description
      active
    }
  }
`;

export const CREATE_POST_CATEGORY = `
  mutation CreatePostCategory($name: String!, $description: String!, $active: Boolean!) {
    createPostCategory(name: $name, description: $description, active: $active) {
      id
      name
      description
      active
    }
  }
`;

export const UPDATE_POST_CATEGORIES = `
  mutation UpdatePostCategories($postCategories: [UpdatePostCategoryInput!]!) {
    updatePostCategories(postCategories: $postCategories) {
      id
      name
      description
      active
    }
  }
`;

export const UPDATE_POST_CATEGORY = `
  mutation UpdatePostCategory($id: ID!, $name: String, $description: String, $active: Boolean) {
    updatePostCategory(id: $id, name: $name, description: $description, active: $active) {
      id
      name
      description
      active
    }
  }
`;

export const SOFT_DELETE_POST_CATEGORIES = `
  mutation SoftDeletePostCategories($ids: [ID!]!) {
    softDeletePostCategories(ids: $ids) {
      id
      name
      description
      active
    }
  }
`;

export const RESTORE_POST_CATEGORIES = `
  mutation RestorePostCategories($ids: [ID!]!) {
    restorePostCategories(ids: $ids) {
      id
      name
      description
      active
    }
  }
`;

export const HARD_DELETE_POST_CATEGORIES = `
  mutation HardDeletePostCategories($ids: [ID!]!) {
    hardDeletePostCategories(ids: $ids)
  }
`;

export const SOFT_DELETE_POST_CATEGORY = `
  mutation SoftDeletePostCategory($id: ID!) {
    softDeletePostCategory(id: $id) {
      id
      name
      description
      active
    }
  }
`;

export const RESTORE_POST_CATEGORY = `
  mutation RestorePostCategory($id: ID!) {
    restorePostCategory(id: $id) {
      id
      name
      description
      active
    }
  }
`;

export const HARD_DELETE_POST_CATEGORY = `
  mutation HardDeletePostCategory($id: ID!) {
    hardDeletePostCategory(id: $id)
  }
`;
