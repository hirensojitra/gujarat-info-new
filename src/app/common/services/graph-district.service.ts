// graph-district.service.ts
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CREATE_DISTRICT, CREATE_DISTRICTS, HARD_DELETE_DISTRICT, HARD_DELETE_DISTRICTS, RESTORE_DISTRICT, RESTORE_DISTRICTS, SOFT_DELETE_DISTRICT, SOFT_DELETE_DISTRICTS, UPDATE_DISTRICT, UPDATE_DISTRICTS } from 'src/app/graphql/mutations/district.mutations';
import { GET_DELETED_DISTRICT_BY_ID, GET_DELETED_DISTRICTS, GET_DISTRICT_BY_ID, GET_DISTRICT_STATS_AND_DATA, GET_DISTRICTS } from 'src/app/graphql/queries/district.queries';
import { District, PaginationInput } from 'src/app/graphql/types/district.types';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class GraphDistrictService {
  private graphUrl = environment.GraphApi + '/graphql';
  constructor(private http: HttpClient) {}

  getDistrictStatsAndData(pagination: PaginationInput, getDeletedDistrictsPagination: PaginationInput): Observable<any> {
    return this.http.post<any>(this.graphUrl, {
      query: GET_DISTRICT_STATS_AND_DATA,
      variables: { pagination, getDeletedDistrictsPagination },
    });
  }

  getDistricts(page: number = 1, limit: number = 10): Observable<any> {
    const variables = { pagination: { page, limit, sortBy: 'name', sortOrder: 'ASC' } };
    return this.http.post<any>(this.graphUrl, {
      query: GET_DISTRICTS,
      variables,
    });
  }

  getDeletedDistricts(page: number = 1, limit: number = 10): Observable<any> {
    const variables = { pagination: { page, limit, sortBy: 'name', sortOrder: 'ASC' } };
    return this.http.post<any>(this.graphUrl, {
      query: GET_DELETED_DISTRICTS,
      variables,
    });
  }

  createDistricts(districts: Partial<District>[]): Observable<any> {
    return this.http.post<any>(this.graphUrl, {
      query: CREATE_DISTRICTS,
      variables: { districts },
    });
  }

  updateDistricts(districts: Partial<District>[]): Observable<any> {
    return this.http.post<any>(this.graphUrl, {
      query: UPDATE_DISTRICTS,
      variables: { districts },
    });
  }

  softDeleteDistricts(ids: string[]): Observable<any> {
    return this.http.post<any>(this.graphUrl, {
      query: SOFT_DELETE_DISTRICTS,
      variables: { ids },
    });
  }

  restoreDistricts(ids: string[]): Observable<any> {
    return this.http.post<any>(this.graphUrl, {
      query: RESTORE_DISTRICTS,
      variables: { ids },
    });
  }

  hardDeleteDistricts(ids: string[]): Observable<any> {
    return this.http.post<any>(this.graphUrl, {
      query: HARD_DELETE_DISTRICTS,
      variables: { ids },
    });
  }

  softDeleteDistrict(id: string): Observable<any> {
    return this.http.post<any>(this.graphUrl, {
      query: SOFT_DELETE_DISTRICT,
      variables: { softDeleteDistrictId: id },
    });
  }

  restoreDistrict(id: string): Observable<any> {
    return this.http.post<any>(this.graphUrl, {
      query: RESTORE_DISTRICT,
      variables: { restoreDistrictId: id },
    });
  }

  getDistrictById(id: string): Observable<any> {
    return this.http.post<any>(this.graphUrl, {
      query: GET_DISTRICT_BY_ID,
      variables: { id },
    });
  }

  getDeletedDistrictById(id: string): Observable<any> {
    return this.http.post<any>(this.graphUrl, {
      query: GET_DELETED_DISTRICT_BY_ID,
      variables: { id },
    });
  }

  createDistrict(district: District): Observable<any> {
    const { name, gu_name } = district;
    return this.http.post<any>(this.graphUrl, {
      query: CREATE_DISTRICT,
      variables: { name, gu_name },
    });
  }

  updateDistrict(district: Partial<District>): Observable<any> {
    return this.http.post<any>(this.graphUrl, {
      query: UPDATE_DISTRICT,
      variables: district,
    });
  }

  hardDeleteDistrict(id: string): Observable<any> {
    return this.http.post<any>(this.graphUrl, {
      query: HARD_DELETE_DISTRICT,
      variables: { id },
    });
  }
}
