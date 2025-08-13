// src/app/graphql/mutations/img.mutations.ts
import { gql } from 'apollo-angular';

// 📁 Create a new folder
export const CREATE_FOLDER = gql`
  mutation CreateFolder($name: String!) {
    createFolder(name: $name) {
      id
      name
      created_at
    }
  }
`;

// 🖼️ Upload a new image to a folder
export const UPLOAD_IMAGE = gql`
  mutation UploadImage($folderId: ID!, $image: Upload!, $metadata: String) {
    uploadImage(folderId: $folderId, image: $image, metadata: $metadata) {
      id
      folder_id
      image_url
      metadata
    }
  }
`;

// 🔁 Refresh (replace) an existing image
export const REFRESH_IMAGE = gql`
  mutation RefreshImage($folderId: ID!, $imageId: ID!, $image: Upload!) {
    refreshImage(folderId: $folderId, imageId: $imageId, image: $image) {
      id
      message
      imageUrl
    }
  }
`;

// ✏️ Rename an existing folder
export const RENAME_FOLDER = gql`
  mutation RenameFolder($folderId: ID!, $name: String!) {
    renameFolder(folderId: $folderId, name: $name)
  }
`;

// ❌ Delete a folder
export const DELETE_FOLDER = gql`
  mutation DeleteFolder($folderId: ID!) {
    deleteFolder(folderId: $folderId)
  }
`;

// ❌ Delete an image
export const DELETE_IMAGE = gql`
  mutation DeleteImage($folderId: ID!, $imageId: ID!) {
    deleteImage(folderId: $folderId, imageId: $imageId)
  }
`;
