import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { map, catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { LOGIN_USER } from 'src/app/graphql/mutations/login.mutations';
import {
  LoginInput,
  LoginPayload,
  UserPublicInfo,
} from 'src/app/graphql/types/login.types';
import { CookieService } from 'ngx-cookie-service';
import {
  HasRoleQuery,
  HasRoleVariables,
} from 'src/app/graphql/types/authentication.types';
import { HAS_ROLE } from 'src/app/graphql/queries/authentication.queries';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(private apollo: Apollo, private cookieService: CookieService) {}

  login(input: LoginInput): Observable<LoginPayload> {
    return this.apollo
      .mutate({
        mutation: LOGIN_USER,
        variables: { input },
        fetchPolicy: 'network-only' // Always fresh login request
      })
      .pipe(
        map((result: any) => result.data.login),
        catchError((error) => throwError(() => new Error(error.message)))
      );
  }
  checkUserHasRole(user_id: string, role_code: string) {
    return this.apollo.query<HasRoleQuery, HasRoleVariables>({
      query: HAS_ROLE,
      variables: { user_id, role_code },
    });
  }
}
