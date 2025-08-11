import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { map, catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import {
  REGISTER_USER,
  VERIFY_EMAIL_OTP,
  RESEND_EMAIL_OTP,
  SET_PASSWORD,
  GOOGLE_AUTH,
} from 'src/app/graphql/mutations/register.mutations';
import {
  RegisterPayload,
  RegisterInput,
  GoogleAuthPayload,
} from 'src/app/graphql/types/register.types';
import { AuthPayload } from 'src/app/graphql/types/login.types';
import { ApolloError } from '@apollo/client';

@Injectable({ providedIn: 'root' })
export class RegisterService {
  private email = '';
  private passKey = '';

  constructor(private apollo: Apollo) {}

  register(input: RegisterInput): Observable<RegisterPayload> {
    this.setCredentials(input);
    return this.apollo
      .mutate<{ register: RegisterPayload }>({
        mutation: REGISTER_USER,
        variables: { input },
        fetchPolicy: 'network-only',
        errorPolicy: 'none',
      })
      .pipe(
        map((res) => {
          if (!res.data) {
            throw new Error('No data received');
          }
          return res.data.register;
        }),
        catchError((err: ApolloError) => {
          if (err.networkError) {
            return throwError(() => new Error('Network error: Could not connect to the server. Please check your internet connection or try again later.'));
          }
          const gqlMsg = err.graphQLErrors?.[0]?.message;
          if (gqlMsg) {
            return throwError(() => new Error(gqlMsg));
          }
          return throwError(() => new Error(err.message));
        })
      );
  }

  verifyOtp(token: string, otp_code: string): Observable<AuthPayload> {
    console.log('verifyOtp', token, otp_code);
    return this.apollo
      .mutate<{ verifyEmailOtp: AuthPayload }>({
        mutation: VERIFY_EMAIL_OTP,
        variables: { token, otp_code },
        fetchPolicy: 'network-only',
        errorPolicy: 'none',
      })
      .pipe(
        map((res) => {
          if (!res.data) {
            throw new Error('No data received');
          }
          return res.data.verifyEmailOtp;
        }),
        catchError((err: ApolloError) => {
          if (err.networkError) {
            return throwError(() => new Error('Network error: Could not connect to the server. Please check your internet connection or try again later.'));
          }
          const gqlMsg = err.graphQLErrors?.[0]?.message;
          if (gqlMsg) {
            return throwError(() => new Error(gqlMsg));
          }
          return throwError(() => new Error(err.message));
        })
      );
  }

  resendOtp(email: string) {
    return this.apollo.mutate<{
      resendEmailOtp: { email_otp_token: string; otp_expires_at: string };
    }>({
      mutation: RESEND_EMAIL_OTP,
      variables: { email },
    });
  }
  googleAuth(idToken: string): Observable<GoogleAuthPayload> {
    return this.apollo
      .mutate<{ googleAuth: GoogleAuthPayload }>({
        mutation: GOOGLE_AUTH,
        variables: { idToken },
        fetchPolicy: 'network-only',
        errorPolicy: 'none',
      })
      .pipe(
        map((res) => {
          if (!res.data) {
            throw new Error('No data received');
          }
          return res.data.googleAuth;
        }),
        catchError(this.extractError)
      );
  }

  /**
   * Once the user provides a new password (after GoogleAuth.requiresPassword===true),
   * call setPassword to finalize registration and receive a JWT.
   */
  setPassword(userId: string, newPassword: string): Observable<AuthPayload> {
    return this.apollo
      .mutate<{ setPassword: AuthPayload }>({
        mutation: SET_PASSWORD,
        variables: { userId, newPassword },
        fetchPolicy: 'network-only',
        errorPolicy: 'none',
      })
      .pipe(
        map((res) => {
          if (!res.data) {
            throw new Error('No data received');
          }
          return res.data.setPassword;
        }),
        catchError(this.extractError)
      );
  }
  private setCredentials(input: RegisterInput) {
    this.email = input.email;
    this.passKey = input.pass_key;
  }

  getEmail(): string {
    return this.email;
  }

  getPassKey(): string {
    return this.passKey;
  }
  private extractError(err: ApolloError) {
    const gqlMsg = err.graphQLErrors?.[0]?.message;
    if (gqlMsg) {
      return throwError(() => new Error(gqlMsg));
    }
    const netMsg = err.networkError?.message;
    return throwError(() => new Error(netMsg || err.message));
  }
}
