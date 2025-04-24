import { gql } from 'apollo-angular';

export const GET_SELECTED_DISTRICT_ID = gql`
  query GetSelectedDistrictId {
    getSelectedDistrictId
  }
`;

export const GET_DISTRICTS = gql`
  query GetDistricts {
    getDistricts {
      id
      name
      gu_name
    }
  }
`;

export const GET_TALUKA_STATS_AND_DATA = gql`
  query GetTalukaStatsByDistrict(
    $district_id: ID
    $activePagination: PaginationInput
    $deletedPagination: PaginationInput
  ) {
    getTalukaStatsByDistrict(
      district_id: $district_id
      activePagination: $activePagination
      deletedPagination: $deletedPagination
    ) {
      selectedId
      totalActiveTalukasByDistrictId
      totalDeletedTalukasByDistrictId
      totalTalukasByDistrictId
      districts {
        id
        name
        gu_name
      }
      activeTalukasByDistrictId {
        id
        name
        gu_name
      }
      deletedTalukasByDistrictId {
        id
        name
        gu_name
      }
    }
  }
`;

export const GET_TALUKAS = gql`
  query GetTalukas($district_id: ID!, $page: Int!, $limit: Int!) {
    getTalukas(
      district_id: $district_id
      pagination: { page: $page, limit: $limit }
    ) {
      id
      name
      gu_name
      district_id
    }
  }
`;

export const GET_DELETED_TALUKAS = gql`
  query GetDeletedTalukas($page: Int!, $limit: Int!) {
    getDeletedTalukas(pagination: { page: $page, limit: $limit }) {
      id
      name
      gu_name
      district_id
    }
  }
`;
