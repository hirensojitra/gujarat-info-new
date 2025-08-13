// src/app/graphql/types/img.types.ts

// ─── Entity Interfaces ───────────────────────────────
export interface Folder {
  id: string;
  name: string;
  created_at: string;
}

export interface Image {
  id: string;
  folder_id: string;
  image_url: string;
  metadata?: string | null;
  description?: string;
  size?: string;
  created_at?: string;
  _objectUrl?: string;
}

// ─── GraphQL Response Types ──────────────────────────
export interface FolderListResponse {
  folders: Folder[];
}

export interface ImageListResponse {
  images: Image[];
}

export interface FolderCountResponse {
  count: number;
}

export interface ImageCountResponse {
  totalCount: number;
}

export interface UploadImageResponse {
  message: string;
  imageId: string;
}

export interface RefreshImageResponse {
  id: string;
  message: string;
  imageUrl: string;
}

export interface DeleteResponse {
  message: string;
}

export interface RenameFolderResponse {
  message: string;
}

export interface CreateFolderResponse {
  message: string;
  folderId: string;
  createdAt: string;
}

// ─── Apollo GraphQL Query Mapped Types ───────────────
export interface GetFoldersResponse {
  getFolders: {
    folders: Folder[];
    total: number;
  };
}

export interface GetImagesResponse {
  getImagesInFolder: {
    images: Image[];
    total: number;
  };
}

export interface TotalCountResponse {
  getTotalFolderCount: {
    count: number;
  };
}
export interface GetInitialDataResponse {
  getInitialFolderData: {
    folders: {
      folders: Folder[];
      total: number;
    };
    folderImages: {
      images: Image[];
      total: number;
    };
  };
}
