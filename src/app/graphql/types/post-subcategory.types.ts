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
    totalPostSubcategoriesByCategoryId: number;
    totalActivePostSubcategoriesByCategoryId: number;
    totalDeletedPostSubcategoriesByCategoryId: number;
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
  