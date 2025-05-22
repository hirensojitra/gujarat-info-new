// src/app/graphql/types/post-thumb.types.ts

export interface PostThumb {
  filename: string;
  path: string;
}

export interface PostThumbUpdateInput {
  filename: string;
  file: File;
}
