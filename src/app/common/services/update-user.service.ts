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
  updateProfile(
    input: UpdateUserInput & { image?: File }
  ): Observable<UserPublicInfo> {
    const token = this.authenticationService.getToken();
    const { image, ...rest } = input;
    console.log('Updating profile with:', rest, 'and image:', image); // Debugging line
    return this.apollo
      .mutate<UpdateUserProfileResponse, UpdateUserProfileVariables>({
        mutation: UPDATE_USER_PROFILE,
        variables: {
          input: rest,
          image,
        },
        context: {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      })
      .pipe(
        map((res) => res.data!.updateUserProfile) // ✅ extract just the user
      );
  }

  getLanguages(): Observable<Language[]> {
    return this.apollo
      .watchQuery<{ languages: Language[] }>({ query: GET_LANGUAGES })
      .valueChanges.pipe(map(({ data }) => data.languages));
  }
}
