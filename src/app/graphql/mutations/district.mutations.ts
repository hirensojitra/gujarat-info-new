export const CREATE_DISTRICTS = `
  mutation CreateDistricts($districts: [DistrictInput]!) {
    createDistricts(districts: $districts) {
      name
      gu_name
    }
  }
`;

export const CREATE_DISTRICT = `
  mutation CreateDistrict($name: String!, $gu_name: String!, $is_deleted: Boolean!) {
    createDistrict(name: $name, gu_name: $gu_name, is_deleted: $is_deleted) {
      id
      name
      gu_name
    }
  }
`;

export const UPDATE_DISTRICTS = `
  mutation UpdateDistricts($districts: [UpdateDistrictInput]!) {
    updateDistricts(districts: $districts) {
      id
    }
  }
`;

export const UPDATE_DISTRICT = `
  mutation UpdateDistrict($id: ID!, $name: String, $gu_name: String, $is_deleted: Boolean) {
    updateDistrict(id: $id, name: $name, gu_name: $gu_name, is_deleted: $is_deleted) {
      id
      name
      gu_name
    }
  }
`;

export const SOFT_DELETE_DISTRICTS = `
  mutation Mutation($ids: [ID]!) {
    softDeleteDistricts(ids: $ids) {
      id
      name
      gu_name
      is_deleted
    }
  }
`;

export const RESTORE_DISTRICTS = `
  mutation Mutation($ids: [ID]!) {
    restoreDistricts(ids: $ids) {
      id
      name
      gu_name
    }
  }
`;

export const HARD_DELETE_DISTRICTS = `
  mutation Mutation($ids: [ID]!) {
    hardDeleteDistricts(ids: $ids)
  }
`;

export const SOFT_DELETE_DISTRICT = `
  mutation Mutation($softDeleteDistrictId: ID!) {
    softDeleteDistrict(id: $softDeleteDistrictId) {
      id
      name
      gu_name
    }
  }
`;

export const RESTORE_DISTRICT = `
  mutation Mutation($restoreDistrictId: ID!) {
    restoreDistrict(id: $restoreDistrictId) {
      id
      name
      gu_name
    }
  }
`;

export const HARD_DELETE_DISTRICT = `
  mutation HardDeleteDistrict($id: ID!) {
    hardDeleteDistrict(id: $id)
  }
`;
