// post-category.queries.ts

export const GET_POST_CATEGORY_STATS_AND_DATA = `
  query GetPostCategoryStatsAndData(
    $pagination: PaginationInput
    $getDeletedPostCategoriesPagination: PaginationInput
  ) {
    getPostCategoryStats {
      postCategoryLength
      activePostCategoryLength
      deletedPostCategoryLength
    }
    getPostCategories(pagination: $pagination) {
      id
      name
      description
      active
    }
    getDeletedPostCategories(pagination: $getDeletedPostCategoriesPagination) {
      id
      name
      description
      active
    }
  }
`;

export const GET_POST_CATEGORIES = `
  query GetPostCategories($pagination: PaginationInput) {
    getPostCategories(pagination: $pagination) {
      id
      name
      description
      active
    }
  }
`;

export const GET_DELETED_POST_CATEGORIES = `
  query GetDeletedPostCategories($pagination: PaginationInput) {
    getDeletedPostCategories(pagination: $pagination) {
      id
      name
      description
      active
    }
  }
`;

export const GET_POST_CATEGORY_BY_ID = `
  query GetPostCategoryById($id: ID!) {
    getPostCategoryById(id: $id) {
      id
      name
      description
      active
    }
  }
`;

export const GET_DELETED_POST_CATEGORY_BY_ID = `
  query GetDeletedPostCategoryById($id: ID!) {
    getDeletedPostCategoryById(id: $id) {
      id
      name
      description
      active
    }
  }
`;
