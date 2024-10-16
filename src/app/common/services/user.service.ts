import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../interfaces/commonInterfaces';
import { environment } from '../../../environments/environment';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private userSubject: BehaviorSubject<User | null> = new BehaviorSubject<User | null>(null);
  private apiUrl = environment.MasterApi + '/auth';

  constructor(
    private http: HttpClient,
    private cookieService: CookieService
  ) {
    // Initialize the user subject based on stored user details in cookies
    const storedUser = this.cookieService.get('user');
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        this.userSubject.next(parsedUser);
      } catch (error) {
        console.error('Error parsing stored user:', error);
        this.cookieService.delete('user');
      }
    }
  }

  getUser(): Observable<User | null> {
    return this.userSubject.asObservable();
  }

  getFullName(): string {
    const user = this.userSubject.value;
    if (user) {
      const firstName = user.firstname || ''; // Default to an empty string if undefined
      const lastName = user.lastname || '';   // Default to an empty string if undefined
      return `${firstName} ${lastName}`.trim(); // Ensure no extra spaces
    }
    return '';
  }

  // Set and store the user details in cookies
  setUser(user: User): void {
    this.cookieService.set('user', JSON.stringify(user), {
      path: '/', // Ensures the cookie is available throughout the application
      secure: false // Set to true if you're using HTTPS
    });
    this.userSubject.next(user);
  }

  // Update user data based on user ID
  updateUserData(userid: string, updatedData: Partial<User>): Observable<any> {
    const token = this.cookieService.get('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    // API endpoint for updating user data
    const fullUrl = `${this.apiUrl}/updateUser/${userid}`;

    return this.http.put(fullUrl, updatedData, { headers });
  }

  // Verify email by sending the verification link
  verifyEmail(token: string, email: string): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.cookieService.get('token')}`
    });
    return this.http.get(`${this.apiUrl}/verify-email?token=${encodeURIComponent(token)}&email=${encodeURIComponent(email)}`, { headers });
  }

  // Register a new user
  registerUser(username: string, password: string, email: string, roles: string[], emailVerified: boolean): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/register`, {
      username,
      password,
      email,
      roles,
      emailVerified,
    });
  }
}
