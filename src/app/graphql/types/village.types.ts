// ./graphql/types/village.types.ts

export interface Village {
    selected: unknown;
    id: string;
    name: string;
    gu_name: string;
  }
  
  export interface Taluka {
    id: string;
    name: string;
    gu_name: string;
  }
  
  export interface District {
    id: string;
    name: string;
    gu_name: string;
  }
  
  export interface PaginationInput {
    page?: number;
    limit?: number;
    sortBy?: string;
    sortOrder?: 'ASC' | 'DESC';
  }
  