import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { catchError, map, Observable, of, throwError } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Router } from '@angular/router';
import { User } from '../interfaces/commonInterfaces';
import { TokenValidationResponse } from '../interfaces/auth.types';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = environment.MasterApi + '/auth';
  private cookieOptions = {
    path: '/',
    secure: environment.production, // Use secure cookies in production
    sameSite: 'Strict' as const,
    httpOnly: false // Set to true if using SameSite=None
  };

  constructor(
    private http: HttpClient,
    private cookieService: CookieService,
    private router: Router
  ) {}

  loginUser(username: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, { username, password })
      .pipe(
        catchError(this.handleError)
      );
  }

  setToken(token: string): void {
    this.cookieService.set('token', token, {
      path: '/', // Ensures the cookie is available throughout the application
      secure: false // Set to true if you're using HTTPS
    });
  }

  getToken(): string | null {
    return this.cookieService.get('token') || null;
  }

  isAuthenticated(): Observable<boolean> {
    const token = this.getToken();
    if (!token) return new Observable<boolean>(observer => observer.next(false));
    
    return this.validateTokenInternal().pipe(
      map(() => true),
      catchError(() => of(false))
    );
  }

  hasRole(expectedRoles: string[]): boolean {
    try {
      const user = this.getUserData();
      if (!user?.roles) return false;

      const roles = Array.isArray(user.roles) 
        ? user.roles 
        : user.roles.split(',').map(r => r.trim());
      
      return expectedRoles.some(role => roles.includes(role));
    } catch (error) {
      console.error('Role check failed:', error);
      return false;
    }
  }

  private getUserData(): User | null {
    const userString = this.cookieService.get('user');
    if (!userString) return null;
    
    try {
      return JSON.parse(userString) as User;
    } catch (error) {
      console.error('Invalid user data:', error);
      return null;
    }
  }

  resendVerificationEmail(email: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/resend-verification`, { email })
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    const errorMessage = error.error?.message || 'An unexpected error occurred';
    return throwError(() => new Error(errorMessage));
  }

  validateToken(): Observable<TokenValidationResponse> {
    const token = this.getToken();
    if (!token) return throwError(() => new Error('No authentication token available'));
    
    return this.validateTokenInternal();
  }

  private validateTokenInternal(): Observable<TokenValidationResponse> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.getToken()}`
    });
    
    return this.http.post<TokenValidationResponse>(
      `${environment.MasterApi}/validate-token`, 
      {}, 
      { headers }
    ).pipe(catchError(this.handleError));
  }

  logout(): void {
    ['token', 'user'].forEach(cookie => 
      this.cookieService.delete(cookie, this.cookieOptions.path)
    );
    this.router.navigate(['/login']);
  }

  requestPasswordReset(email: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/forgot-password`, { email })
      .pipe(catchError(this.handleError));
  }

  resetPassword(token: string, email: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/reset-password`, { token, email, password })
      .pipe(catchError(this.handleError));
  }

  validateResetToken(token: string, email: string): Observable<TokenValidationResponse> {
    return this.http.post<TokenValidationResponse>(
      `${this.apiUrl}/validate-reset-token`, 
      { token, email }
    ).pipe(catchError(this.handleError));
  }
}