import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class GraphDistrictService {
  private graphUrl = environment.GraphApi + '/graphql';
  constructor(private http: HttpClient) {}
  getDistrictStatsAndData(
    pagination: any, // Pagination for active districts
    getDeletedDistrictsPagination: any // Pagination for deleted districts
  ): Observable<any> {
    const query = `
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
          is_deleted
        }
        getDeletedDistricts(pagination: $getDeletedDistrictsPagination) {
          id
          name
          gu_name
          is_deleted
        }
      }
    `;
    const variables = {
      pagination,
      getDeletedDistrictsPagination,
    };

    return this.http.post<any>(this.graphUrl, {
      query,
      variables,
    });
  }
  getDistricts(page: number = 1, limit: number = 10): Observable<any> {
    const query = `
        query GetDistricts($pagination: PaginationInput) {
          getDistricts(pagination: $pagination) {
            id
            name
            gu_name
          }
        }
      `;
    const variables = {
      pagination: { page, limit, sortBy: 'name', sortOrder: 'ASC' },
    };
    return this.http.post<any>(this.graphUrl, {
      query,
      variables,
    });
  }
  getDeletedDistricts(page: number = 1, limit: number = 10): Observable<any> {
    const query = `
        query GetDeletedDistricts($pagination: PaginationInput) {
          getDeletedDistricts(pagination: $pagination) {
            id
            name
            gu_name
          }
        }
      `;
    const variables = {
      pagination: { page, limit, sortBy: 'name', sortOrder: 'ASC' },
    };
    return this.http.post<any>(this.graphUrl, {
      query,
      variables,
    });
  }
  createDistricts(districts: any[]): Observable<any> {
    const query = `
      mutation CreateDistricts($districts: [DistrictInput]!) {
        createDistricts(districts: $districts) {
          name
          gu_name
        }
      }
    `;
    const variables = { districts };

    return this.http.post<any>(this.graphUrl, {
      query,
      variables,
    });
  }
  // Update multiple districts
  updateDistricts(districts: any[]): Observable<any> {
    const query = `
    mutation UpdateDistricts($districts: [UpdateDistrictInput]!) {
      updateDistricts(districts: $districts) {
        id
      }
    }
  `;
    const variables = { districts };

    return this.http.post<any>(this.graphUrl, {
      query,
      variables,
    });
  }
  softDeleteDistricts(ids: string[]): Observable<any> {
    const query = `
      mutation Mutation($ids: [ID]!) {
        softDeleteDistricts(ids: $ids) {
          id
          name
          gu_name
          is_deleted
        }
      }
    `;
    const variables = { ids };

    return this.http.post<any>(this.graphUrl, {
      query,
      variables,
    });
  }
  restoreDistricts(ids: string[]): Observable<any> {
    const query = `
      mutation Mutation($ids: [ID]!) {
        restoreDistricts(ids: $ids) {
          id
          name
          gu_name
          is_deleted
        }
      }
    `;
    const variables = { ids };

    return this.http.post<any>(this.graphUrl, {
      query,
      variables,
    });
  }
  hardDeleteDistricts(ids: string[]): Observable<any> {
    const query = `
      mutation Mutation($ids: [ID]!) {
        hardDeleteDistricts(ids: $ids)
      }
    `;
    const variables = { ids };

    return this.http.post<any>(this.graphUrl, {
      query,
      variables,
    });
  }
  softDeleteDistrict(id: string): Observable<any> {
    const query = `
      mutation Mutation($softDeleteDistrictId: ID!) {
        softDeleteDistrict(id: $softDeleteDistrictId) {
          id
          name
          gu_name
          is_deleted
        }
      }
    `;
    const variables = { softDeleteDistrictId: id };

    return this.http.post<any>(this.graphUrl, {
      query,
      variables,
    });
  }
  restoreDistrict(id: string): Observable<any> {
    const query = `
      mutation Mutation($restoreDistrictId: ID!) {
        restoreDistrict(id: $restoreDistrictId) {
          id
          name
          gu_name
          is_deleted
        }
      }
    `;
    const variables = { restoreDistrictId: id };

    return this.http.post<any>(this.graphUrl, {
      query,
      variables,
    });
  }
  /** Fetch a single active district by ID */
  getDistrictById(id: string): Observable<any> {
    const query = `
      query GetDistrictById($id: ID!) {
        getDistrictById(id: $id) {
          id
          name
          gu_name
          is_deleted
        }
      }
    `;
    return this.http.post<any>(this.graphUrl, {
      query,
      variables: { id },
    });
  }

  /** Fetch a single deleted district by ID */
  getDeletedDistrictById(id: string): Observable<any> {
    const query = `
      query GetDeletedDistrictById($id: ID!) {
        getDeletedDistrictById(id: $id) {
          id
          name
          gu_name
          is_deleted
        }
      }
    `;
    return this.http.post<any>(this.graphUrl, {
      query,
      variables: { id },
    });
  }

  /** Create one new district */
  createDistrict(district: {
    name: string;
    gu_name: string;
    is_deleted: boolean;
  }): Observable<any> {
    const query = `
      mutation CreateDistrict($name: String!, $gu_name: String!, $is_deleted: Boolean!) {
        createDistrict(name: $name, gu_name: $gu_name, is_deleted: $is_deleted) {
          id
          name
          gu_name
          is_deleted
        }
      }
    `;
    const variables = {
      name: district.name,
      gu_name: district.gu_name,
      is_deleted: district.is_deleted,
    };
    return this.http.post<any>(this.graphUrl, { query, variables });
  }

  /** Update one existing district */
  updateDistrict(district: {
    id: string;
    name?: string;
    gu_name?: string;
    is_deleted?: boolean;
  }): Observable<any> {
    const query = `
      mutation UpdateDistrict(
        $id: ID!
        $name: String
        $gu_name: String
        $is_deleted: Boolean
      ) {
        updateDistrict(
          id: $id
          name: $name
          gu_name: $gu_name
          is_deleted: $is_deleted
        ) {
          id
          name
          gu_name
          is_deleted
        }
      }
    `;
    const variables = {
      id: district.id,
      name: district.name,
      gu_name: district.gu_name,
      is_deleted: district.is_deleted,
    };
    return this.http.post<any>(this.graphUrl, { query, variables });
  }

  /** Hard-delete a single district by ID */
  hardDeleteDistrict(id: string): Observable<any> {
    const query = `
      mutation HardDeleteDistrict($id: ID!) {
        hardDeleteDistrict(id: $id)
      }
    `;
    return this.http.post<any>(this.graphUrl, {
      query,
      variables: { id },
    });
  }
}
