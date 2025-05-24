// src/app/common/services/reset-password.service.ts
import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { map, catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import {
  ResetOtpPayload,
  RequestPasswordResetMutation,
  ResetPasswordByOtpMutation,
  ResetPasswordByOtpInput,
} from 'src/app/graphql/types/reset-password.types';
import {
  REQUEST_PASSWORD_RESET,
  RESET_PASSWORD_BY_OTP,
} from 'src/app/graphql/mutations/reset-password.mutations';
import { AuthPayload } from 'src/app/graphql/types/login.types';
import { ApolloError } from '@apollo/client/errors';

@Injectable({ providedIn: 'root' })
export class ResetPasswordService {
  constructor(private apollo: Apollo) {}

  /**
   * Step 1: Request an OTP for password reset.
   * Returns the token and expiry timestamp.
   */
  requestPasswordReset(email: string): Observable<ResetOtpPayload> {
    return this.apollo
      .mutate<RequestPasswordResetMutation>({
        mutation: REQUEST_PASSWORD_RESET,
        variables: { email },
        fetchPolicy: 'network-only',
        errorPolicy: 'none',
      })
      .pipe(
        map((res) => {
          if (!res.data) {
            throw new Error('No data received');
          }
          return res.data.requestPasswordReset;
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

  /**
   * Step 2: Reset the password using OTP token, code, and new password.
   * Returns full AuthPayload so user can be auto-logged in.
   */
  resetPasswordByOtp(
    input: ResetPasswordByOtpInput
  ): Observable<AuthPayload> {
    return this.apollo
      .mutate<ResetPasswordByOtpMutation>({
        mutation: RESET_PASSWORD_BY_OTP,
        variables: {
          token: input.token,
          otp_code: input.otp_code,
          new_pass_key: input.new_pass_key,
        },
        fetchPolicy: 'network-only',
        errorPolicy: 'none',
      })
      .pipe(
        map((res) => {
          if (!res.data) {
            throw new Error('No data received');
          }
          return res.data.resetPasswordByOtp;
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
}
