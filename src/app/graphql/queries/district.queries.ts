export const GET_DISTRICT_STATS_AND_DATA = `
  query GetDistrictStats($pagination: PaginationInput, $getDeletedDistrictsPagination: PaginationInput) {
    getDistrictStats {
      activeDistrictLength
      deletedDistrictLength
      districtLength
    }
    getDistricts(pagination: $pagination) {
      id
      name
      gu_name
    }
    getDeletedDistricts(pagination: $getDeletedDistrictsPagination) {
      id
      name
      gu_name
    }
  }
`;

export const GET_DISTRICTS = `
  query GetDistricts($pagination: PaginationInput) {
    getDistricts(pagination: $pagination) {
      id
      name
      gu_name
    }
  }
`;

export const GET_DELETED_DISTRICTS = `
  query GetDeletedDistricts($pagination: PaginationInput) {
    getDeletedDistricts(pagination: $pagination) {
      id
      name
      gu_name
    }
  }
`;

export const GET_DISTRICT_BY_ID = `
  query GetDistrictById($id: ID!) {
    getDistrictById(id: $id) {
      id
      name
      gu_name
    }
  }
`;

export const GET_DELETED_DISTRICT_BY_ID = `
  query GetDeletedDistrictById($id: ID!) {
    getDeletedDistrictById(id: $id) {
      id
      name
      gu_name
    }
  }
`;
