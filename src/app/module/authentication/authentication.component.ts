import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, of } from 'rxjs';
import { ToastService } from 'src/app/common/services/toast.service';
import { RegisterService } from 'src/app/common/services/register.service';
import { AuthenticationService } from 'src/app/common/services/authentication.service';
import { CookieService } from 'ngx-cookie-service';

declare const google: any;

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrl: './authentication.component.scss',
})
export class AuthenticationComponent {
  isLoading = false;
  errorMessage = '';

  showSetPassword = false;
  googleUserId = '';
  newPassword = '';
  confirmPassword = '';

  constructor(
    private router: Router,
    private registerService: RegisterService,
    private authService: AuthenticationService,
    private toast: ToastService,
    private cookie: CookieService
  ) {}

  handleGoogleCredential(response: any): void {
    console.log('Google response:', response);
    try {
      const idToken = response.credential;
      this.isLoading = true;
      this.errorMessage = '';

      this.registerService
        .googleAuth(idToken)
        .pipe(
          catchError((err) => {
            this.isLoading = false;
            this.toast.show(err.message || 'Google auth failed', {
              class: 'bg-danger',
            });
            return of(null);
          })
        )
        .subscribe((result) => {
          this.isLoading = false;
          if (!result) return;
          if (result.token) {
            const common = {
              path: '/',
              secure: window.location.protocol === 'https:',
              sameSite: 'Lax',
            } as const;

            this.authService.setToken(result.token);

            // route off to the new component
            result.requiresPassword
              ? () => {
                  this.cookie.set(
                    'requires_password',
                    String(result.requiresPassword),
                    common
                  );
                  this.cookie.set('google_user_id', result.user.id, common);
                  this.router.navigate(['/set-password']);
                }
              : () => {
                  this.router.navigate(['/home']);
                };
          }
        });
    } catch (e) {
      console.error('handleGoogleCredential error:', e);
      this.toast.show('Internal error processing Google response', {
        class: 'bg-danger',
      });
      this.isLoading = false;
    }
  }

  registerWithGoogle() {
    this.isLoading = true;
    google.accounts.id.initialize({
      client_id:
        '650577899089-abc77o2gr9jldf1sfi6rcg6gptcdq4p8.apps.googleusercontent.com',
      callback: (resp) => this.handleGoogleCredential(resp),
    });

    // Force FedCM & listen for prompt diagnostics:
    google.accounts.id.prompt((notif: any) => {
      console.group('GSI Prompt Notification');
      console.log(
        'NotDisplayed?',
        notif.isNotDisplayed(),
        notif.getNotDisplayedReason()
      );
      console.log(
        'Skipped?',
        notif.isSkippedMoment(),
        notif.getSkippedReason()
      );
      console.log(
        'Dismissed?',
        notif.isDismissedMoment(),
        notif.getDismissedReason()
      );
      console.groupEnd();
    });
  }
}
