// src/app/common/services/session.service.ts

import { Injectable, OnDestroy } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { AuthenticationService } from './authentication.service';
import { VALIDATE_TOKEN } from 'src/app/graphql/queries/authentication.queries';

@Injectable({ providedIn: 'root' })
export class SessionService implements OnDestroy {
  private sessionSub?: Subscription;
  constructor(
    private apollo: Apollo,
    private authService: AuthenticationService,
    private router: Router
  ) {}
  startSessionSync(): void {
    const token = this.authService.getToken();
    this.sessionSub = this.apollo
      .watchQuery<any>({
        query: VALIDATE_TOKEN,
        variables: { token },
        fetchPolicy: 'network-only',
      })
      .valueChanges.subscribe(
        ({ data }) => this.handleResponse(data.validateToken),
        (err) => this.handleError(err)
      );
  }
  private handleResponse(payload: { token?: string; user?: any }) {
    if (payload?.user) {
      if (this.router.url.startsWith('/authentication')) {
        if (payload.user.email_verified) {
          this.router.navigate(['/home']);
        } else {
          this.router.navigate(['/authentication/verify-email']);
        }
      }
    } else {
      // invalid / expired → clear session and go to login
      this.authService.logout();
      this.router.navigate(['/authentication/login']);
    }
  }

  private handleError(err: any) {
    console.error('Session validation failed', err);
    this.authService.logout();
    this.router.navigate(['/authentication/login']);
  }

  ngOnDestroy() {
    this.sessionSub?.unsubscribe();
  }
}
