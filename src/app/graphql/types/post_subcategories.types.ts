// src/app/graphql/types/post-subcategory.types.ts

export interface PostCategory {
  id: string;
  name: string;
  description: string;
}

export interface PostSubcategory {
  id: string;
  name: string;
  description: string;
  category_id: string;
}


export interface PostSubcategoryStats {
  selectedId: string;
  totalActivePostSubcategoriesByCategoryId: number;
  totalDeletedPostSubcategoriesByCategoryId: number;
  totalPostSubcategoriesByCategoryId: number;
  categories: PostCategory[];
  activePostSubcategoriesByCategoryId: PostSubcategory[];
  deletedPostSubcategoriesByCategoryId: PostSubcategory[];
}

export interface PaginationInput {
  page: number;
  limit: number;
  sortBy?: string;
  sortOrder?: 'ASC' | 'DESC';
}
