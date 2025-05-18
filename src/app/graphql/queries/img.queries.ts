// src/app/graphql/queries/img.queries.ts
import { gql } from 'apollo-angular';

// 🔍 Get all folders with pagination, search, and sorting
export const GET_FOLDERS = gql`
  query GetFolders(
    $page: Int
    $limit: Int
    $search: String
    $sortBy: String
    $order: String
  ) {
    getFolders(
      page: $page
      limit: $limit
      search: $search
      sortBy: $sortBy
      order: $order
    ) {
      folders {
        id
        name
        created_at
      }
      total
    }
  }
`;

// 🔢 Get total folder count (with search)
export const GET_TOTAL_FOLDER_COUNT = gql`
  query GetTotalFolderCount($search: String) {
    getTotalFolderCount(search: $search) {
      count
    }
  }
`;

// 🖼️ Get images in a specific folder
export const GET_IMAGES_IN_FOLDER = gql`
  query GetImagesInFolder(
    $folderId: ID!
    $page: Int
    $limit: Int
    $search: String
    $sort: String
  ) {
    getImagesInFolder(
      folderId: $folderId
      page: $page
      limit: $limit
      search: $search
      sort: $sort
    ) {
      images {
        id
        image_url
        metadata
      }
      total
    }
  }
`;

// 🔢 Get total image count in a folder
export const GET_TOTAL_IMAGE_COUNT = gql`
  query GetTotalImageCountInFolder($folderId: String!, $search: String) {
    getTotalImageCountInFolder(folderId: $folderId, search: $search) {
      totalCount
    }
  }
`;

export const GET_INITIAL_FOLDER_DATA = gql`
  query GetInitialFolderData($folderLimit: Int!, $imageLimit: Int!) {
    getInitialFolderData(folderLimit: $folderLimit, imageLimit: $imageLimit) {
      folders {
        folders {
          id
          name
          created_at
        }
        total
      }
      folderImages {
        images {
          id
          folder_id
          image_url
          metadata
        }
        total
      }
    }
  }
`;
