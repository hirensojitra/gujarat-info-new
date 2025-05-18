// post-category.types.ts

export interface PostCategory {
  id?: string;
  name: string;
  description: string;
  active?: boolean;
}
export interface PaginationInput {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'ASC' | 'DESC';
}
export interface PostCategoryInput {
  name: string;
  description: string;
}
export interface UpdatePostCategoryInput {
  id: string;
  name?: string;
  description?: string;
  active?: boolean;
}
