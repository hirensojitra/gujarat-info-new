import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, of } from 'rxjs';
import { ToastService } from 'src/app/common/services/toast.service';
import { RegisterService } from 'src/app/common/services/register.service';
import { AuthenticationService } from 'src/app/common/services/authentication.service';

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
    private toast: ToastService
  ) {}

  handleGoogleCredential(response: any): void {
    try {
      const idToken = response.credential;
      this.isLoading = true;
      this.errorMessage = '';

      this.registerService
        .googleAuth(idToken)
        .pipe(
          catchError(err => {
            this.isLoading = false;
            this.toast.show(err.message || 'Google auth failed', {
              class: 'bg-danger',
            });
            return of(null);
          })
        )
        .subscribe(result => {
          this.isLoading = false;
          if (!result) return;

          if (result.requiresPassword) {
            this.googleUserId = result.userId;
            this.showSetPassword = true;
          } else if (result.token) {
            this.authService.setToken(result.token);
            this.router.navigate(['/home']);
          } else {
            this.toast.show('Unexpected response from Google auth', {
              class: 'bg-warning',
            });
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
    client_id: '650577899089-abc77o2gr9jldf1sfi6rcg6gptcdq4p8.apps.googleusercontent.com',
    callback: resp => this.handleGoogleCredential(resp),
  });

  // Force FedCM & listen for prompt diagnostics:
  google.accounts.id.prompt((notif: any) => {
    console.group('GSI Prompt Notification');
    console.log('NotDisplayed?', notif.isNotDisplayed(), notif.getNotDisplayedReason());
    console.log('Skipped?',     notif.isSkippedMoment(), notif.getSkippedReason());
    console.log('Dismissed?',   notif.isDismissedMoment(), notif.getDismissedReason());
    console.groupEnd();
  });
}

  onSubmitNewPassword(): void {
    if (this.newPassword !== this.confirmPassword) {
      this.errorMessage = 'Passwords do not match';
      return;
    }
    this.isLoading = true;

    this.registerService
      .setPassword(this.googleUserId, this.newPassword)
      .pipe(
        catchError(err => {
          this.isLoading = false;
          this.toast.show(err.message || 'Could not set password', {
            class: 'bg-danger',
          });
          return of(null);
        })
      )
      .subscribe(res => {
        this.isLoading = false;
        if (res?.token) {
          this.authService.setToken(res.token);
          this.router.navigate(['/home']);
        }
      });
  }
}
