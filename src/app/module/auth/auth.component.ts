import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../common/services/auth.service';
import { environment } from 'src/environments/environment';
import { UserService } from 'src/app/common/services/user.service';
import { ToastService } from 'src/app/common/services/toast.service';
import { HttpClient } from '@angular/common/http';
import { catchError, of } from 'rxjs';

declare const google: any;
@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'], // Corrected property name from styleUrl to styleUrls
})
export class AuthComponent implements AfterViewInit {
  api: string = environment.MasterApi;
  isLoading: boolean = false;
  errorMessage: string = '';
  constructor(
    private router: Router,
    private userService: UserService,
    private authService: AuthService,
    private toast: ToastService,
    private http: HttpClient
  ) {}
  ngAfterViewInit(): void {
    if (this.authService.isAuthenticated()) {
      this.router.navigate(['/dashboard']);
    }
  }
  handleGoogleCredential(response: any): void {
    const idToken = response.credential;

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
            console.log(response);
            this.userService.setUser(response);
            this.authService.setToken(response.token);
            this.router.navigate(['/dashboard']);
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

  registerWithFacebook(): void {
    this.isLoading = true;
    this.errorMessage = '';

    // Call your backend endpoint for Facebook registration
    // The backend should return a redirect URL for Facebook OAuth flow
    this.http
      .get(this.api + '/auth/facebook', { responseType: 'json' })
      .pipe(
        catchError((error) => {
          this.errorMessage =
            error.error?.message || 'Facebook registration failed.';
          this.isLoading = false;
          return of(null);
        })
      )
      .subscribe((result: any) => {
        this.isLoading = false;
        if (result && result.redirectUrl) {
          // Redirect the user to the provided URL for Facebook OAuth
          window.location.href = result.redirectUrl;
        } else {
          this.errorMessage = 'Unable to process Facebook registration.';
        }
      });
  }
}
