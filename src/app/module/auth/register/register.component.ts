import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { environment } from 'src/environments/environment';
declare const google: any;
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registrationForm: FormGroup;
  isLoading: boolean = false;
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.registrationForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      roles: ['user'] // default role; adjust if needed
    });
  }
  handleGoogleCredential(response: any): void {
    const idToken = response.credential; // The idToken received from Google
    console.log('Google idToken:', idToken); // Debugging
  
    // Send the idToken to the backend
    this.http.post(this.api + '/auth/google', { idToken }, { responseType: 'json' })
      .pipe(
        catchError(error => {
          this.errorMessage = error.error?.message || 'Google authentication failed.';
          this.isLoading = false;
          return of(null);
        })
      )
      .subscribe((result: any) => {
        this.isLoading = false;
        if (result && result.token) {
          localStorage.setItem('token', result.token); // Store the JWT
          this.router.navigate(['/dashboard']); // Navigate to dashboard
        } else {
          this.errorMessage = 'Unable to process Google registration.';
        }
      });
  }
  
  register(): void {
    if (this.registrationForm.invalid) {
      return;
    }
    this.isLoading = true;
    this.errorMessage = '';

    // Call the backend API for standard registration
    this.http.post('/api/auth/register', this.registrationForm.value)
      .pipe(
        catchError(error => {
          this.errorMessage = error.error?.message || 'Registration failed.';
          this.isLoading = false;
          console.log(this.errorMessage)
          return of(null);
        })
      )
      .subscribe((result: any) => {
        this.isLoading = false;
        if (result && result.success) {
          // Redirect to login page or dashboard after successful registration
          this.router.navigate(['/auth/login']);
        } else if (result && result.error) {
          this.errorMessage = result.error;
        }
      });
  }
  api:string=environment.MasterApi;
  registerWithGoogle(): void {
    this.isLoading = true;
    this.errorMessage = '';
  
    google.accounts.id.initialize({
      client_id: '650577899089-eq5q93v869b5qvi6vllcq81o8v06ubsm.apps.googleusercontent.com',
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
    this.http.get(this.api+'/auth/facebook', { responseType: 'json' })
      .pipe(
        catchError(error => {
          this.errorMessage = error.error?.message || 'Facebook registration failed.';
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
