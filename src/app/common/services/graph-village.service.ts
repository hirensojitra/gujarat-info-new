// File 6: graph-village.service.ts
import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { gql } from 'apollo-angular';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class GraphVillageService {
  constructor(private apollo: Apollo) {}

  getAllTalukas(district_id: string): Observable<any> {
    const query = gql`
      query GetTalukasByDistrictId($district_id: ID!) {
        getTalukasByDistrictId(district_id: $district_id) {
          id
          name
          gu_name
        }
      }
    `;
    return this.apollo.watchQuery({
      query,
      variables: {
        district_id: district_id, // Replace with actual district ID or pass dynamically
      },
    }).valueChanges;
  }

  getVillageStatsByTaluka(
    talukaId: string,
    activePagination: any,
    deletedPagination: any
  ): Observable<any> {
    const query = gql`
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
          talukas {
            name
            gu_name
            id
          }
          selectedDistrictId
          selectedTalukaId
          activeVillagesByTalukaId {
            name
            gu_name
            id
          }
          deletedVillagesByTalukaId {
            name
            gu_name
            id
          }
          totalVillagesByTalukaId
          totalActiveVillagesByTalukaId
          totalDeletedVillagesByTalukaId
        }
      }
    `;

    return this.apollo.watchQuery({
      query,
      variables: {
        talukaId,
        activePagination,
        deletedPagination,
      },
      fetchPolicy: 'network-only',
    }).valueChanges;
  }

  createVillages(villages: any[]): Observable<any> {
    const mutation = gql`
      mutation CreateVillages($villages: [VillageInput]!) {
        createVillages(villages: $villages) {
          id
        }
      }
    `;
    return this.apollo.mutate({
      mutation,
      variables: { villages },
    });
  }

  updateVillages(villages: any[]): Observable<any> {
    const mutation = gql`
      mutation UpdateVillages($villages: [UpdateVillageInput]!) {
        updateVillages(villages: $villages) {
          id
        }
      }
    `;
    return this.apollo.mutate({
      mutation,
      variables: { villages },
    });
  }

  softDeleteVillage(id: string): Observable<any> {
    const mutation = gql`
      mutation SoftDeleteVillage($id: ID!) {
        softDeleteVillage(id: $id) {
          id
        }
      }
    `;
    return this.apollo.mutate({
      mutation,
      variables: { id },
    });
  }

  softDeleteVillages(ids: string[]): Observable<any> {
    const mutation = gql`
      mutation SoftDeleteVillages($ids: [ID]!) {
        softDeleteVillages(ids: $ids) {
          id
        }
      }
    `;
    return this.apollo.mutate({
      mutation,
      variables: { ids },
    });
  }

  restoreVillage(id: string): Observable<any> {
    const mutation = gql`
      mutation RestoreVillage($id: ID!) {
        restoreVillage(id: $id) {
          id
        }
      }
    `;
    return this.apollo.mutate({
      mutation,
      variables: { id },
    });
  }

  restoreVillages(ids: string[]): Observable<any> {
    const mutation = gql`
      mutation RestoreVillages($ids: [ID]!) {
        restoreVillages(ids: $ids) {
          id
        }
      }
    `;
    return this.apollo.mutate({
      mutation,
      variables: { ids },
    });
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
  getVillagesByTalukaId(talukaId: string, pagination: any): Observable<any> {
    const query = gql`
      query GetVillagesByTalukaId($talukaId: ID!, $pagination: PaginationInput) {
        getVillagesByTalukaId(taluka_id: $talukaId, pagination: $pagination) {
          id
          name
          gu_name
        }
      }
    `;
    return this.apollo.watchQuery({
      query,
      variables: { talukaId, pagination },
      fetchPolicy: 'network-only',
    }).valueChanges;
  }
  getDeletedVillagesByTalukaId(talukaId: string, pagination: any): Observable<any> {
    const query = gql`
      query GetDeletedVillagesByTalukaId($talukaId: ID!, $pagination: PaginationInput) {
        getDeletedVillagesByTalukaId(taluka_id: $talukaId, pagination: $pagination) {
          id
          name
          gu_name
        }
      }
    `;
    return this.apollo.watchQuery({
      query,
      variables: { talukaId, pagination },
      fetchPolicy: 'network-only',
    }).valueChanges;
  }
  
}
