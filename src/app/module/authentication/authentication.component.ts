import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, of } from 'rxjs';
import { AuthenticationService } from 'src/app/common/services/authentication.service';
import { ToastService } from 'src/app/common/services/toast.service';
import { environment } from 'src/environments/environment';

declare const google: any;
@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrl: './authentication.component.scss',
})
export class AuthenticationComponent {
  api: string = environment.MasterApi;
  isLoading: boolean = false;
  errorMessage: string = '';
  constructor(
    private router: Router,

    private authService: AuthenticationService,
    private toast: ToastService,
    private http: HttpClient
  ) {}
  handleGoogleCredential(response: any): void {
    const idToken = response.credential; // The idToken received from Google
    console.log('Google idToken:', idToken); // Debugging

    // Send the idToken to the backend
    this.http
      .post(this.api + '/auth/google', { idToken }, { responseType: 'json' })
      .pipe(
        catchError((error) => {
          this.isLoading = false;
          this.toast.show(
            error.error?.message || 'Google authentication failed.',
            { class: 'bg-danger' }
          );
          return of(null);
        })
      )
      .subscribe({
        next: (response: any) => {
          this.isLoading = false;
          if (response && response.token) {
            this.authService.setToken(response.token);
            this.router.navigate(['/home']);
          } else {
            this.toast.show('Unable to process Google registration.', {
              class: 'bg-danger',
            });
          }
        },
        error: (error) => {
          this.isLoading = false;
          this.toast.show(error.message || 'Google authentication failed.', {
            class: 'bg-danger',
          });
        },
        complete: () => {
          this.isLoading = false;
        },
      });
  }
  registerWithGoogle(): void {
    this.isLoading = true;
    this.errorMessage = '';

    google.accounts.id.initialize({
      client_id:
        '650577899089-eq5q93v869b5qvi6vllcq81o8v06ubsm.apps.googleusercontent.com',
      callback: (response: any) => this.handleGoogleCredential(response),
    });

    // Render the Google button inside a div (optional)
    google.accounts.id.prompt();
  }
}
