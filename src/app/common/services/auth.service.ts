import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { catchError, map, Observable, throwError } from 'rxjs';
import { environment } from '../../../environments/environment';
import { UserService } from './user.service';
import { Router } from '@angular/router';
import { User } from '../interfaces/commonInterfaces';
import { LoaderService } from './loader';
import { TokenValidationResponse } from '../interfaces/auth.types';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = environment.MasterApi + '/auth';
  constructor(private http: HttpClient, private cookieService: CookieService, private userService: UserService, private router: Router, private loaderService: LoaderService) {

  }

  // Login user method
  loginUser(username: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, { username, password })
  }
  // Set token in the cookies
  setToken(token: string): void {
    this.cookieService.set('token', token, {
      path: '/', // Ensures the cookie is available throughout the application
      secure: false // Set to true if you're using HTTPS
    });
  }


  // Get token method (no need for async here since cookies are accessed synchronously)
  getToken(): string {
    return this.cookieService.get('token');
  }

  // Check if the user is authenticated
  isAuthenticated(): Observable<boolean> {
    const token = this.getToken();
    if (!token) {
      return new Observable(observer => {
        observer.next(false); // Token is missing, not authenticated
        observer.complete();
      });
    }

    // If the token exists, validate it with the backend
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}` // Send the token in the Authorization header
    });

    // Call the server to validate the token
    return this.http.post(`${environment.MasterApi}/validate-token`, {}, { headers })
      .pipe(
        map(() => true), // If server validation is successful, return true
        catchError(() => {
          return new Observable<boolean>(observer => {
            observer.next(false); // If validation fails, return false
            observer.complete();
          });
        })
      );
  }
  hasRole(expectedRoles: string[]): boolean {
    // Retrieve the user cookie
    const userString = this.cookieService.get('user');

    // Check if userString exists and is not empty
    if (!userString) {
      console.warn('User cookie is missing or empty');
      return false;  // Return false if the user cookie is missing
    }

    let user: User | null = null; // Initialize user as null

    try {
      user = JSON.parse(userString); // Try to parse the JSON string
    } catch (error) {
      console.error('Error parsing user JSON:', error);
      return false;  // Return false if parsing fails
    }

    // Now you can safely access the roles if the user object is valid
    if (user && user.roles) {
      const roles = user.roles;  // Access the roles array or string

      // Split roles by comma, trim whitespace, and check if any of the expectedRoles are included
      return expectedRoles.some(role =>
        roles.split(',').map(item => item.trim()).includes(role)
      );
    }

    return false;  // Return false if no roles or user is null
  }

  resendVerificationEmail(email: string): Observable<any> {
    const payload = { email };
    return this.http.post(`${this.apiUrl}/resend-verification`, payload)
      .pipe(
        catchError(this.handleError)
      );
  }
  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred';

    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side error
      if (error.status === 404) {
        errorMessage = 'User not found';
      } else if (error.status === 400) {
        errorMessage = 'Email is already verified';
      } else {
        errorMessage = `Server error: ${error.message}`;
      }
    }
    return throwError(errorMessage);
  }
  validateToken(): Observable<any> {
    const token = this.cookieService.get('token');
    if (!token) {
      // No token in cookies, you may handle this error (like logging out the user)
      return new Observable(observer => {
        observer.error({ message: 'No token provided' });
      });
    }

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}` // Send the token in the Authorization header
    });
    return this.http.post(`${environment.MasterApi}/validate-token`, {}, { headers }); // POST request to backend
  }
  logout(): void {
    // Remove the token from cookies
    this.cookieService.delete('token', '/'); // Ensure to delete it from the entire application path

    // Optionally remove user data from cookies
    this.cookieService.delete('user', '/');

    // Optionally, notify the backend (if required)
    // this.http.post(`${this.apiUrl}/logout`, {}).subscribe(
    //   response => {
    //     console.log('Logout successful:', response);
    //   },
    //   error => {
    //     console.error('Logout error:', error);
    //   }
    // );

    // Navigate to the login page or a public area
    this.router.navigate(['/login']); // Adjust the route as per your application's routing structure
  }
  requestPasswordReset(email: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/forgot-password`, { email });
  }
  resetPassword(token: string, email: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/reset-password`, { token, email, password });
  }
  validateResetToken(token: string, email: string): Observable<TokenValidationResponse> {
    alert(`${this.apiUrl}/validate-reset-token` + ' ' + token + ' ' + email)
    return this.http.post<TokenValidationResponse>(`${this.apiUrl}/validate-reset-token`, { token, email })
      .pipe(
        catchError((error) => {
          return throwError(error.error.message || 'Error validating token');
        })
      );
  }

}
