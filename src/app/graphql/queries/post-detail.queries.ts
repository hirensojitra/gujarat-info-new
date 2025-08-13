// src/app/graphql/queries/post-detail.queries.ts
import { gql } from 'apollo-angular';
export const GET_ALL_POSTS_MINIMAL = gql`
  query GetAllPostsMinimal(
    $page: Int!
    $limit: Int
    $search: String
    $sortBy: String
    $order: String
    $published: Boolean
    $info_show: Boolean
  ) {
    getAllPosts(
      page: $page
      limit: $limit
      search: $search
      sortBy: $sortBy
      order: $order
      published: $published
      info_show: $info_show
    ) {
      posts {
        id
        title
        info
        image
        download_counter
      }
      pagination {
        currentPage
        totalPages
        totalPosts
      }
    }
  }
`;
/** Fetch a paginated list of posts */
export const GET_ALL_POSTS = gql`
  query GetAllPosts(
    $page: Int!
    $limit: Int
    $search: String
    $sortBy: String
    $order: String
    $published: Boolean
    $info_show: Boolean
  ) {
    getAllPosts(
      page: $page
      limit: $limit
      search: $search
      sortBy: $sortBy
      order: $order
      published: $published
      info_show: $info_show
    ) {
      posts {
        id
        title
        info
        info_show
        h
        w
        backgroundurl
        download_counter
        published
        track
        image
        created_at
        updated_at
        deleted_at
      }
      pagination {
        currentPage
        totalPages
        totalPosts
      }
    }
  }
`;

/** Fetch a single post by ID */
export const GET_POST_BY_ID = gql`
  query GetPostById($id: String!) {
    getPostById(id: $id) {
      id
      title
      info
      info_show
      h
      w
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
      subcategory_id
      category {
        id
        name
        description
        active
      }
      deleted
      subcategory {
        id
        name
        description
        category_id
        active
      }
    }
  }
`;

/** Fetch a paginated list of soft‐deleted posts */
export const GET_ALL_SOFT_DELETED_POSTS = gql`
  query GetAllSoftDeletedPosts(
    $page: Int!
    $limit: Int
    $search: String
    $sortBy: String
    $order: String
  ) {
    getAllSoftDeletedPosts(
      page: $page
      limit: $limit
      search: $search
      sortBy: $sortBy
      order: $order
    ) {
      posts {
        id
        title
        deleted
        deleted_at
      }
      pagination {
        currentPage
        totalPages
        totalPosts
      }
    }
  }
`;

/** Fetch total counts */
export const GET_TOTAL_POST_LENGTH = gql`
  query GetTotalPostLength {
    getTotalPostLength
  }
`;

export const GET_TOTAL_DELETED_POST_LENGTH = gql`
  query GetTotalDeletedPostLength {
    getTotalDeletedPostLength
  }
`;

/** Download counter operations */
export const GET_DOWNLOAD_COUNTER = gql`
  query GetDownloadCounter($id: String!) {
    getDownloadCounter(id: $id)
  }
`;

export const UPDATE_DOWNLOAD_COUNTER = gql`
  query UpdateDownloadCounter($id: String!) {
    updateDownloadCounter(id: $id)
  }
`;
