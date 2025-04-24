import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GraphTalukaService {
  constructor(private apollo: Apollo) {}
  getSelectedDistrictId(): Observable<any> {
    const GET_ID = gql`
      query Query {
        getSelectedDistrictId
      }
    `;
    return this.apollo.watchQuery({ query: GET_ID }).valueChanges;
  }
  getAllDistricts(): Observable<any> {
    const GET_DISTRICTS = gql`
      query GetDistricts {
        getDistricts {
          id
          name
          gu_name
          is_deleted
        }
      }
    `;
    return this.apollo.watchQuery({ query: GET_DISTRICTS }).valueChanges;
  }

  // Fetch Taluka Stats and Data (Active and Deleted)
  getTalukaStatsAndData(
    districtId: string,
    activePagination: { page: number; limit: number },
    deletedPagination: { page: number; limit: number }
  ): Observable<any> {
    const GET_TALUKA_STATS_AND_DATA = gql`
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
            is_deleted
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

    return this.apollo.watchQuery({
      query: GET_TALUKA_STATS_AND_DATA,
      variables: {
        district_id: districtId,
        activePagination,
        deletedPagination,
      },
      fetchPolicy: 'network-only'
    }).valueChanges;
  }

  // Fetch Talukas with pagination
  getTalukas(
    district_id: string,
    page: number,
    limit: number
  ): Observable<any> {
    const GET_TALUKAS = gql`
      query GetTalukas($district_id: ID!, $page: Int!, $limit: Int!) {
        getTalukas(
          district_id: $district_id
          pagination: { page: $page, limit: $limit }
        ) {
          id
          name
          gu_name
          district_id
          is_deleted
        }
      }
    `;
    return this.apollo.watchQuery({
      query: GET_TALUKAS,
      variables: { district_id, page, limit },
    }).valueChanges;
  }

  // Fetch Deleted Talukas
  getDeletedTalukas(page: number, limit: number): Observable<any> {
    const GET_DELETED_TALUKAS = gql`
      query GetDeletedTalukas($page: Int!, $limit: Int!) {
        getDeletedTalukas(pagination: { page: $page, limit: $limit }) {
          id
          name
          gu_name
          district_id
          is_deleted
        }
      }
    `;
    return this.apollo.watchQuery({
      query: GET_DELETED_TALUKAS,
      variables: { page, limit },
    }).valueChanges;
  }

  // Create Talukas
  createTalukas(talukas: any[]): Observable<any> {
    const CREATE_TALUKAS = gql`
      mutation CreateTalukas($districts: [TalukaInput]!) {
        createTalukas(districts: $districts) {
          id
          name
          gu_name
          district_id
          is_deleted
        }
      }
    `;
    return this.apollo.mutate({
      mutation: CREATE_TALUKAS,
      variables: { districts: talukas },
    });
  }

  // Update Talukas
  updateTalukas(talukas: any[]): Observable<any> {
    const UPDATE_TALUKAS = gql`
      mutation UpdateTalukas($districts: [UpdateTalukaInput]!) {
        updateTalukas(districts: $districts) {
          id
          name
          gu_name
          district_id
          is_deleted
        }
      }
    `;
    return this.apollo.mutate({
      mutation: UPDATE_TALUKAS,
      variables: { districts: talukas },
    });
  }

  // Soft Delete Taluka
  softDeleteTaluka(id: string): Observable<any> {
    const SOFT_DELETE_TALUKA = gql`
      mutation SoftDeleteTaluka($id: ID!) {
        softDeleteTaluka(id: $id) {
          id
          name
          is_deleted
        }
      }
    `;
    return this.apollo.mutate({
      mutation: SOFT_DELETE_TALUKA,
      variables: { id },
    });
  }

  // Soft Delete Multiple Talukas
  softDeleteTalukas(ids: string[]): Observable<any> {
    const SOFT_DELETE_TALUKAS = gql`
      mutation SoftDeleteTalukas($ids: [ID]!) {
        softDeleteTalukas(ids: $ids) {
          id
          name
          is_deleted
        }
      }
    `;
    return this.apollo.mutate({
      mutation: SOFT_DELETE_TALUKAS,
      variables: { ids },
    });
  }

  // Restore Taluka
  restoreTaluka(id: string): Observable<any> {
    const RESTORE_TALUKA = gql`
      mutation RestoreTaluka($id: ID!) {
        restoreTaluka(id: $id) {
          id
          name
          is_deleted
        }
      }
    `;
    return this.apollo.mutate({
      mutation: RESTORE_TALUKA,
      variables: { id },
    });
  }

  // Restore Multiple Talukas
  restoreTalukas(ids: string[]): Observable<any> {
    const RESTORE_TALUKAS = gql`
      mutation RestoreTalukas($ids: [ID]!) {
        restoreTalukas(ids: $ids) {
          id
          name
          is_deleted
        }
      }
    `;
    return this.apollo.mutate({
      mutation: RESTORE_TALUKAS,
      variables: { ids },
    });
  }
}
