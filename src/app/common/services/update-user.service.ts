// src/app/common/services/update-user.service.ts

import { Injectable } from '@angular/core';
import { Apollo, QueryRef } from 'apollo-angular';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { UPDATE_USER_PROFILE } from 'src/app/graphql/mutations/update-user.mutations';
import {
  GetCurrentUserResponse,
  UpdateUserInput,
  UpdateUserProfileResponse,
  UpdateUserProfileVariables,
} from 'src/app/graphql/types/update-user.types';
import { Language, UserPublicInfo } from 'src/app/graphql/types/login.types';
import { AuthenticationService } from './authentication.service';
import { GET_LANGUAGES } from 'src/app/graphql/queries/language.queries';

@Injectable({
  providedIn: 'root',
})
export class UpdateUserService {
  private userQuery!: QueryRef<GetCurrentUserResponse>;

  constructor(
    private apollo: Apollo,
    private authenticationService: AuthenticationService
  ) {}

  /** Refetch the profile (e.g. after a mutation) */
  refetchCurrentUser(): void {
    this.userQuery?.refetch();
  }

  /** Update any subset of profile fields */
  updateProfile(input: UpdateUserInput): Observable<UserPublicInfo> {
    const token = this.authenticationService.getToken(); // ← grab the JWT
    console.log('input', input);
    return this.apollo
      .mutate<UpdateUserProfileResponse, UpdateUserProfileVariables>({
        mutation: UPDATE_USER_PROFILE,
        variables: { input },
        context: {
          headers: {
            Authorization: `Bearer ${token}`, // ← set it here
          },
        },
      })
      .pipe(
        map((result) => {
          const updated = result.data!.updateUserProfile;
          // keep the watchQuery up to date
          this.userQuery?.refetch();
          return updated;
        })
      );
  }
  getLanguages(): Observable<Language[]> {
    return this.apollo
      .watchQuery<{ languages: Language[] }>({ query: GET_LANGUAGES })
      .valueChanges.pipe(map(({ data }) => data.languages));
  }
}
