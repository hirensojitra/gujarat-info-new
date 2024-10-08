import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { catchError, map, Observable, of, throwError } from 'rxjs';
import { environment } from '../../../environments/environment';
import { UserService } from './user.service';
import { Router } from '@angular/router';
import { User } from '../interfaces/commonInterfaces';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = environment.MasterApi + '/auth';
  constructor(private http: HttpClient, private cookieService: CookieService, private userService: UserService, private router: Router) {

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
  isAuthenticated(): boolean {
    const token = this.getToken();
    return token ? true : false; // Returns true if token exists, otherwise false
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
}
