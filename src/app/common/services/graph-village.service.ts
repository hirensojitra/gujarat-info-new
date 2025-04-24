// ./services/graph-village.service.ts
import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Observable } from 'rxjs';
import {
  GET_DISTRICTS,
  GET_TALUKAS_BY_DISTRICT_ID,
  GET_VILLAGES_BY_TALUKA_ID,
  GET_DELETED_VILLAGES_BY_TALUKA_ID,
  GET_VILLAGE_STATS_BY_TALUKA
} from '../../graphql/queries/village.queries';
import {
  CREATE_VILLAGES,
  UPDATE_VILLAGES,
  SOFT_DELETE_VILLAGE,
  SOFT_DELETE_VILLAGES,
  RESTORE_VILLAGE,
  RESTORE_VILLAGES
} from '../../graphql/mutations/village.mutations';
import { District, PaginationInput, Taluka, Village } from '../../graphql/types/village.types';
import { ApolloQueryResult } from '@apollo/client';

@Injectable({ providedIn: 'root' })
export class GraphVillageService {
  constructor(private apollo: Apollo) {}

  getAllDistricts(): Observable<ApolloQueryResult<{ getDistricts: District[] }>> {
    return this.apollo.watchQuery<{ getDistricts: District[] }>({
      query: GET_DISTRICTS
    }).valueChanges;
  }

  getAllTalukas(district_id: string): Observable<ApolloQueryResult<{ getTalukasByDistrictId: Taluka[] }>> {
    return this.apollo.watchQuery<{ getTalukasByDistrictId: Taluka[] }>({
      query: GET_TALUKAS_BY_DISTRICT_ID,
      variables: { district_id },
    }).valueChanges;
  }

  getVillageStatsByTaluka(
    talukaId: string,
    activePagination: PaginationInput,
    deletedPagination: PaginationInput
  ): Observable<ApolloQueryResult<any>> {
    return this.apollo.watchQuery({
      query: GET_VILLAGE_STATS_BY_TALUKA,
      variables: { talukaId, activePagination, deletedPagination },
      fetchPolicy: 'network-only',
    }).valueChanges;
  }

  getVillagesByTalukaId(
    talukaId: string,
    pagination: PaginationInput
  ): Observable<ApolloQueryResult<{ getVillagesByTalukaId: Village[] }>> {
    return this.apollo.watchQuery<{ getVillagesByTalukaId: Village[] }>({
      query: GET_VILLAGES_BY_TALUKA_ID,
      variables: { talukaId, pagination },
      fetchPolicy: 'network-only',
    }).valueChanges;
  }

  getDeletedVillagesByTalukaId(
    talukaId: string,
    pagination: PaginationInput
  ): Observable<ApolloQueryResult<{ getDeletedVillagesByTalukaId: Village[] }>> {
    return this.apollo.watchQuery<{ getDeletedVillagesByTalukaId: Village[] }>({
      query: GET_DELETED_VILLAGES_BY_TALUKA_ID,
      variables: { talukaId, pagination },
      fetchPolicy: 'network-only',
    }).valueChanges;
  }

  createVillages(villages: Village[]): Observable<any> {
    return this.apollo.mutate({
      mutation: CREATE_VILLAGES,
      variables: { villages },
    });
  }

  updateVillages(villages: Village[]): Observable<any> {
    console.log(villages)
    return this.apollo.mutate({
      mutation: UPDATE_VILLAGES,
      variables: { villages },
    });
  }

  softDeleteVillage(id: string): Observable<any> {
    return this.apollo.mutate({
      mutation: SOFT_DELETE_VILLAGE,
      variables: { id },
    });
  }

  softDeleteVillages(ids: string[]): Observable<any> {
    return this.apollo.mutate({
      mutation: SOFT_DELETE_VILLAGES,
      variables: { ids },
    });
  }

  restoreVillage(id: string): Observable<any> {
    return this.apollo.mutate({
      mutation: RESTORE_VILLAGE,
      variables: { id },
    });
  }

  restoreVillages(ids: string[]): Observable<any> {
    return this.apollo.mutate({
      mutation: RESTORE_VILLAGES,
      variables: { ids },
    });
  }
}
