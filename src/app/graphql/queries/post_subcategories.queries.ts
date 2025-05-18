import { gql } from 'apollo-angular';

export const GET_SELECTED_POST_CATEGORY_ID = gql`
  query GetSelectedPostCategoryId {
    getSelectedPostCategoryId
  }
`;

export const GET_POST_SUBCATEGORY_STATS_AND_DATA = gql`
  query GetPostSubcategoryStatsByCategory(
    $category_id: ID
    $activePagination: PaginationInput
    $deletedPagination: PaginationInput
  ) {
    getPostSubcategoryStatsByCategory(
      category_id: $category_id
      activePagination: $activePagination
      deletedPagination: $deletedPagination
    ) {
      selectedId
      totalActivePostSubcategoriesByCategoryId
      totalDeletedPostSubcategoriesByCategoryId
      totalPostSubcategoriesByCategoryId
      categories {
        id
        name
        description
      }
      activePostSubcategoriesByCategoryId {
        id
        name
        description
      }
      deletedPostSubcategoriesByCategoryId {
        id
        name
        description
      }
    }
  }
`;

export const GET_POST_SUBCATEGORIES = gql`
  query GetPostSubcategories(
    $category_id: ID!
    $page: Int!
    $limit: Int!
  ) {
    getPostSubcategoriesByCategoryId(
      category_id: $category_id
      pagination: { page: $page, limit: $limit }
    ) {
      id
      name
      description
      category_id
    }
  }
`;

export const GET_DELETED_POST_SUBCATEGORIES = gql`
  query GetDeletedPostSubcategories(
    $page: Int!
    $limit: Int!
  ) {
    getDeletedPostSubcategories(
      pagination: { page: $page, limit: $limit }
    ) {
      id
      name
      description
      category_id
    }
  }
`;
