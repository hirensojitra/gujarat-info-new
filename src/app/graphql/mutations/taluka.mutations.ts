import { gql } from 'apollo-angular';

export const CREATE_TALUKAS = gql`
  mutation CreateTalukas($talukas: [TalukaInput]!) {
    createTalukas(talukas: $talukas) {
      id
      name
      gu_name
      district_id
    }
  }
`;

export const UPDATE_TALUKAS = gql`
  mutation UpdateTalukas($talukas: [UpdateTalukaInput]!) {
    updateTalukas(talukas: $talukas) {
      id
      name
      gu_name
      district_id
    }
  }
`;

export const SOFT_DELETE_TALUKA = gql`
  mutation SoftDeleteTaluka($id: ID!) {
    softDeleteTaluka(id: $id) {
      id
      name
    }
  }
`;

export const SOFT_DELETE_TALUKAS = gql`
  mutation SoftDeleteTalukas($ids: [ID]!) {
    softDeleteTalukas(ids: $ids) {
      id
      name
    }
  }
`;

export const RESTORE_TALUKA = gql`
  mutation RestoreTaluka($id: ID!) {
    restoreTaluka(id: $id) {
      id
      name
    }
  }
`;

export const RESTORE_TALUKAS = gql`
  mutation RestoreTalukas($ids: [ID]!) {
    restoreTalukas(ids: $ids) {
      id
      name
    }
  }
`;
