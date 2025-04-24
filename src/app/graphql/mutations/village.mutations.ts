import { gql } from 'apollo-angular';

export const CREATE_VILLAGES = gql`
  mutation CreateVillages($villages: [VillageInput]!) {
    createVillages(villages: $villages) {
      id
    }
  }
`;

export const UPDATE_VILLAGES = gql`
  mutation UpdateVillages($villages: [UpdateVillageInput]!) {
    updateVillages(villages: $villages) {
      id
    }
  }
`;

export const SOFT_DELETE_VILLAGE = gql`
  mutation SoftDeleteVillage($id: ID!) {
    softDeleteVillage(id: $id) {
      id
    }
  }
`;

export const SOFT_DELETE_VILLAGES = gql`
  mutation SoftDeleteVillages($ids: [ID]!) {
    softDeleteVillages(ids: $ids) {
      id
    }
  }
`;

export const RESTORE_VILLAGE = gql`
  mutation RestoreVillage($id: ID!) {
    restoreVillage(id: $id) {
      id
    }
  }
`;

export const RESTORE_VILLAGES = gql`
  mutation RestoreVillages($ids: [ID]!) {
    restoreVillages(ids: $ids) {
      id
    }
  }
`;
