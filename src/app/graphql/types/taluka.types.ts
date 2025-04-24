export interface District {
  id: string;
  name: string;
  gu_name: string;
}

export interface Taluka {
  id: string;
  name: string;
  gu_name: string;
  district_id: string;
}

export interface TalukaStats {
  selectedId: string;
  totalActiveTalukasByDistrictId: number;
  totalDeletedTalukasByDistrictId: number;
  totalTalukasByDistrictId: number;
  districts: District[];
  activeTalukasByDistrictId: Taluka[];
  deletedTalukasByDistrictId: Taluka[];
}

export interface PaginationInput {
  page: number;
  limit: number;
  sortBy?: string;
  sortOrder?: 'ASC' | 'DESC';
}
