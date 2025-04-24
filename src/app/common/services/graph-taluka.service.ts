import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Observable } from 'rxjs';
import { ApolloQueryResult } from '@apollo/client/core';

import {
  CREATE_TALUKAS,
  UPDATE_TALUKAS,
  SOFT_DELETE_TALUKA,
  SOFT_DELETE_TALUKAS,
  RESTORE_TALUKA,
  RESTORE_TALUKAS
} from 'src/app/graphql/mutations/taluka.mutations';

import {
  GET_SELECTED_DISTRICT_ID,
  GET_DISTRICTS,
  GET_TALUKA_STATS_AND_DATA,
  GET_TALUKAS,
  GET_DELETED_TALUKAS
} from 'src/app/graphql/queries/taluka.queries';

import {
  District,
  Taluka,
  TalukaStats,
  PaginationInput
} from 'src/app/graphql/types/taluka.types';

@Injectable({ providedIn: 'root' })
export class GraphTalukaService {
  constructor(private apollo: Apollo) {}

  getSelectedDistrictId(): Observable<ApolloQueryResult<{ getSelectedDistrictId: string }>> {
    return this.apollo.watchQuery<{ getSelectedDistrictId: string }>({
      query: GET_SELECTED_DISTRICT_ID
    }).valueChanges;
  }

  getAllDistricts(): Observable<ApolloQueryResult<{ getDistricts: District[] }>> {
    return this.apollo.watchQuery<{ getDistricts: District[] }>({
      query: GET_DISTRICTS
    }).valueChanges;
  }

  getTalukaStatsAndData(
    districtId: string,
    activePagination: PaginationInput,
    deletedPagination: PaginationInput
  ): Observable<ApolloQueryResult<{ getTalukaStatsByDistrict: TalukaStats }>> {
    return this.apollo.watchQuery<{ getTalukaStatsByDistrict: TalukaStats }>({
      query: GET_TALUKA_STATS_AND_DATA,
      variables: {
        district_id: districtId,
        activePagination,
        deletedPagination
      },
      fetchPolicy: 'network-only'
    }).valueChanges;
  }

  getTalukas(
    district_id: string,
    page: number,
    limit: number
  ): Observable<ApolloQueryResult<{ getTalukas: Taluka[] }>> {
    return this.apollo.watchQuery<{ getTalukas: Taluka[] }>({
      query: GET_TALUKAS,
      variables: { district_id, page, limit },
      fetchPolicy: 'network-only'
    }).valueChanges;
  }

  getDeletedTalukas(page: number, limit: number): Observable<ApolloQueryResult<{ getDeletedTalukas: Taluka[] }>> {
    return this.apollo.watchQuery<{ getDeletedTalukas: Taluka[] }>({
      query: GET_DELETED_TALUKAS,
      variables: { page, limit },
      fetchPolicy: 'network-only'
    }).valueChanges;
  }

  createTalukas(talukas: Taluka[]): Observable<any> {
    return this.apollo.mutate({
      mutation: CREATE_TALUKAS,
      variables: { talukas: talukas }
    });
  }

  updateTalukas(talukas: Taluka[]): Observable<any> {
    console.log({ talukas: talukas })
    return this.apollo.mutate({
      mutation: UPDATE_TALUKAS,
      variables: { talukas: talukas }
    });
  }

  softDeleteTaluka(id: string): Observable<any> {
    return this.apollo.mutate({
      mutation: SOFT_DELETE_TALUKA,
      variables: { id }
    });
  }

  softDeleteTalukas(ids: string[]): Observable<any> {
    return this.apollo.mutate({
      mutation: SOFT_DELETE_TALUKAS,
      variables: { ids }
    });
  }

  restoreTaluka(id: string): Observable<any> {
    return this.apollo.mutate({
      mutation: RESTORE_TALUKA,
      variables: { id }
    });
  }

  restoreTalukas(ids: string[]): Observable<any> {
    return this.apollo.mutate({
      mutation: RESTORE_TALUKAS,
      variables: { ids }
    });
  }
}
