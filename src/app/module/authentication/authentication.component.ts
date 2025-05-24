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

            this.authService.saveSession(result.token, result.user);
            // route off to the new component
            if (result.requiresPassword) {
              this.cookie.set(
                'requires_password',
                String(result.requiresPassword),
                common
              );
              this.cookie.set('google_user_id', result.user.id, common);
              this.router.navigate(['/authentication-action/set-password']);
            } else {
              this.router.navigate(['/home']);
            }
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
    // const resp = {
    //   credential:
    //     'eyJhbGciOiJSUzI1NiIsImtpZCI6IjY2MGVmM2I5Nzg0YmRmNTZlYmU4NTlmNTc3ZjdmYjJlOGMxY2VmZmIiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL2FjY291bnRzLmdvb2dsZS5jb20iLCJhenAiOiI2NTA1Nzc4OTkwODktYWJjNzdvMmdyOWpsZGYxc2ZpNnJjZzZncHRjZHE0cDguYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJhdWQiOiI2NTA1Nzc4OTkwODktYWJjNzdvMmdyOWpsZGYxc2ZpNnJjZzZncHRjZHE0cDguYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJzdWIiOiIxMDg5MjI4MTY5NDY3NzQ4MTA0NjMiLCJlbWFpbCI6Imd1amFyYXR1dmFjaEBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwibmJmIjoxNzQ4MTI1NTcwLCJuYW1lIjoiR3VqYXJhdCBVdmFjaCIsInBpY3R1cmUiOiJodHRwczovL2xoMy5nb29nbGV1c2VyY29udGVudC5jb20vYS9BQ2c4b2NMRTlncEpYMnBlYmZpYzg0aldkUWxGYlRFQ3ZCV0c1Z2lDSTJBRWtZaDRhYU50c2c9czk2LWMiLCJnaXZlbl9uYW1lIjoiR3VqYXJhdCIsImZhbWlseV9uYW1lIjoiVXZhY2giLCJpYXQiOjE3NDgxMjU4NzAsImV4cCI6MTc0ODEyOTQ3MCwianRpIjoiNzM3YWJhMDU0OGNmZjkwMmFkZWRlNWFjNDVjNmZhNjIxNGQxZmEwOCJ9.JQNfTaMQqb42aGqOoMLh7940KzOiV4aNamXUEFYeg4CkgnNI5u85EQkI5Cy-WL9st1_UHcdsIEeCn1geCWU-t1SyOboreCilrzIZc4sOQQJ2P3jbjie940JxDnqdfZwnJXBaRFVKHmsNpwFQMckKbHNToLSUxaWuISxYxw_XagrfRfCCCSf0OBnnCWaXgC7ZxHduA29HeGiTgqXCmoaWY2Wothi6iddrONOOeqBtFBCR3XfdvQEsD0nexTvzb166N2UkBFuvE-uHv4LrTvIwfF7QA3KHBQu-VqgMGqsG6n3p1qqCEUl732NA4lqvbTIEo37H1YDl-4yrVUdYNcMcQw',
    //   select_by: 'fedcm',
    // };
    // let payload: any;
    // try {
    //   // decode the JWT payload
    //   const b64 = resp.credential
    //     .split('.')[1]
    //     .replace(/-/g, '+')
    //     .replace(/_/g, '/');
    //   payload = JSON.parse(atob(b64));
    // } catch (e) {}
    // console.log('Decoded Google JWT payload:', payload);
    // this.handleGoogleCredential(resp);
    google.accounts.id.initialize({
      client_id:
        '650577899089-abc77o2gr9jldf1sfi6rcg6gptcdq4p8.apps.googleusercontent.com',
      callback: (resp) => this.handleGoogleCredential(resp),
    });

    // // Force FedCM & listen for prompt diagnostics:
    // google.accounts.id.prompt((notif: any) => {
    //   console.group('GSI Prompt Notification');
    //   console.log(
    //     'NotDisplayed?',
    //     notif.isNotDisplayed(),
    //     notif.getNotDisplayedReason()
    //   );
    //   console.log(
    //     'Skipped?',
    //     notif.isSkippedMoment(),
    //     notif.getSkippedReason()
    //   );
    //   console.log(
    //     'Dismissed?',
    //     notif.isDismissedMoment(),
    //     notif.getDismissedReason()
    //   );
    //   console.groupEnd();
    // });
  }
}
