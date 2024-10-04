import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = environment.MasterApi + '/auth';

  constructor(private http: HttpClient, private cookieService: CookieService) { }

  // Login user method
  loginUser(username: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, { username, password });
  }

  // Logout method: delete cookies and navigate to the login page
  logout(): void {
    this.cookieService.delete('token');
    this.cookieService.delete('user');
    console.log('Logged out successfully. Token:', this.cookieService.get('token')); // Should print an empty string
  }

  // Set token in the cookies
  setToken(token: string): void {
    this.cookieService.set('token', token);
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
}
