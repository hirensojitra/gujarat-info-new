import { Injectable, OnDestroy } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Subscription } from 'rxjs';
import { AuthenticationService } from './authentication.service';
import { VALIDATE_TOKEN } from 'src/app/graphql/queries/authentication.queries';

@Injectable({ providedIn: 'root' })
export class SessionService implements OnDestroy {
  private sessionSub?: Subscription;

  constructor(
    private apollo: Apollo,
    private authService: AuthenticationService
  ) {}

  /**
   * Call once (e.g. in AppComponent.ngOnInit()) to
   * validate/refresh the login token and user profile.
   */
  startSessionSync(): void {
    const token = this.authService.getToken();
    this.sessionSub = this.apollo
      .watchQuery<any>({
        query: VALIDATE_TOKEN,
        variables: { token },
        fetchPolicy: 'network-only',
      })
      .valueChanges
      .subscribe(
        ({ data }) => this.handleResponse(data.validateToken),
        (err)   => this.handleError(err)
      );
  }

  private handleResponse(payload: any) {
    if (payload?.user) {
      debugger;
      if (payload.token) {
        this.authService.setToken(payload.token);
      }
      // 2) replace stored user info
      this.authService.setUser(payload.user);
    } else {
      // invalid / expired → force logout
      this.authService.logout();
    }
  }

  private handleError(err: any) {
    console.error('Session validation failed', err);
    this.authService.logout();
  }

  ngOnDestroy() {
    this.sessionSub?.unsubscribe();
  }
}