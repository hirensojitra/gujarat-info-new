import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { map, catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { REGISTER_USER } from 'src/app/graphql/mutations/register.mutations';
import {
  RegisterPayload,
  RegisterInput,
} from 'src/app/graphql/types/register.types';
import { ApolloError } from '@apollo/client';

@Injectable({ providedIn: 'root' })
export class RegisterService {
  constructor(
    private apollo: Apollo
  ) {}
  email:string='';
  passKey:string='';
  register(input: RegisterInput): Observable<RegisterPayload> {
    this.setCredentials(input)
    return this.apollo
      .mutate({
        mutation: REGISTER_USER,
        variables: { input },
        fetchPolicy: 'network-only',
        errorPolicy: 'none', 
      })
      .pipe(
        map((res: any) => {
          if (!res.data) {
            throw new Error('No data received');
          }
          return res.data.register
        }),
        catchError((err: ApolloError) => {
          const gqlMsg = err.graphQLErrors?.[0]?.message;
          if (gqlMsg) {
            return throwError(() => new Error(gqlMsg));
          }
          const netMsg = err.networkError?.message;
          return throwError(() => new Error(netMsg || err.message));
        })
      );
  }
  setCredentials(input:RegisterInput) {
    this.email = input.email;
    this.passKey = input.pass_key;
  }

  getEmail(): string {
    return this.email;
  }

  getPassKey(): string {
    return this.passKey;
  }
}
