// src/app/common/services/role.service.ts

import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { gql } from 'apollo-angular';
import { Role } from 'src/app/graphql/types/role.types';

const GET_ROLES = gql`
  query GetRoles {
    roles {
      id
      code
      name
      description
    }
  }
`;

const GET_ROLE_BY_ID = gql`
  query GetRole($id: ID!) {
    role(id: $id) {
      id
      code
      name
      description
    }
  }
`;

@Injectable({ providedIn: 'root' })
export class RoleService {
  constructor(private apollo: Apollo) {}
  getRoles(): Observable<Role[]> {
    return this.apollo
      .watchQuery<{ roles: Role[] }>({ query: GET_ROLES })
      .valueChanges.pipe(map(({ data }) => data.roles));
  }
  getRoleById(id: string): Observable<Role | null> {
    return this.apollo
      .watchQuery<{ role: Role | null }>({
        query: GET_ROLE_BY_ID,
        variables: { id },
      })
      .valueChanges.pipe(
        map(({ data }) => {
          return data.role;
        })
      );
  }
}
