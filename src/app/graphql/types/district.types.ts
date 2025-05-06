export interface District {
    id?: string;
    name?: string;
    gu_name?: string;
    is_deleted?: boolean;
  }
  
  export interface PaginationInput {
    page?: number;
    limit?: number;
    sortBy?: string;
    sortOrder?: string;
  }
  