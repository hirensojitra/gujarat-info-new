import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { map, Observable, of } from 'rxjs';
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


  // Logout method: delete cookies and navigate to the login page
  // Logout method: delete cookies and navigate to the login page
  async logout(): Promise<void> {
    this.cookieService.delete('token');
    this.cookieService.delete('user');
    await new Promise(resolve => setTimeout(resolve, 1000));
    this.router.navigate(['/auth/login']);
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
    const userString = this.cookieService.get('user');
    let user: User; // Using 'any' for simplicity; consider using a specific interface if possible

    try {
      user = JSON.parse(userString); // Parse the JSON string
    } catch (error) {
      console.error('Error parsing user:', error);
      user = null; // Handle parsing error
    }

    // Now you can safely access the roles
    if (user) {
      const roles = user.roles; // Access the roles
      if (roles) {
        // Split roles by comma, trim whitespace, and check if any of the expectedRoles are included
        return expectedRoles.some(role =>
          roles.split(',').map(item => item.trim()).includes(role)
        );
      }
    }

    return false; // Return false if no roles or user is null
  }

}