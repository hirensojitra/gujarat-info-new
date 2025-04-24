// ./graphql/queries/village.queries.ts
import { gql } from 'apollo-angular';

export const GET_DISTRICTS = gql`
  query GetDistricts {
    getDistricts {
      id
      name
      gu_name
      is_deleted
    }
  }
`;

export const GET_TALUKAS_BY_DISTRICT_ID = gql`
  query GetTalukasByDistrictId($district_id: ID!) {
    getTalukasByDistrictId(district_id: $district_id) {
      id
      name
      gu_name
    }
  }
`;

export const GET_VILLAGES_BY_TALUKA_ID = gql`
  query GetVillagesByTalukaId($talukaId: ID!, $pagination: PaginationInput) {
    getVillagesByTalukaId(taluka_id: $talukaId, pagination: $pagination) {
      id
      name
      gu_name
    }
  }
`;

export const GET_DELETED_VILLAGES_BY_TALUKA_ID = gql`
  query GetDeletedVillagesByTalukaId($talukaId: ID!, $pagination: PaginationInput) {
    getDeletedVillagesByTalukaId(taluka_id: $talukaId, pagination: $pagination) {
      id
      name
      gu_name
    }
  }
`;

export const GET_VILLAGE_STATS_BY_TALUKA = gql`
  query GetVillageStatsByTaluka(
    $talukaId: ID
    $activePagination: PaginationInput
    $deletedPagination: PaginationInput
  ) {
    getVillageStatsByTaluka(
      taluka_id: $talukaId
      activePagination: $activePagination
      deletedPagination: $deletedPagination
    ) {
      talukas { name gu_name id }
      selectedDistrictId
      selectedTalukaId
      activeVillagesByTalukaId { name gu_name id }
      deletedVillagesByTalukaId { name gu_name id }
      totalVillagesByTalukaId
      totalActiveVillagesByTalukaId
      totalDeletedVillagesByTalukaId
    }
  }
`;
