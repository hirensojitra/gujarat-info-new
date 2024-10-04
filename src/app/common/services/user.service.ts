import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../interfaces/commonInterfaces';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private userSubject: BehaviorSubject<User | null> = new BehaviorSubject<User | null>(null);
  private apiUrl = environment.MasterApi + '/auth';
  private token: string | null = this.cookieService.get('token'); // Retrieve token from cookies

  constructor(
    private http: HttpClient,
    private router: Router,
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
        // Handle the error, clear the stored user details in cookies
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
    this.userSubject.next(user);
    this.cookieService.set('user', JSON.stringify(user));
    if (user && user['token']) {
      this.cookieService.set('token', user['token']);
    }
    // if (!user.image) {
    //   setTimeout(() => {
    //     this.router.navigate(['/dashboard']);
    //   }, 1500);
    // }
  }

  // Clear user details from the service and cookies
  clearUser(): void {
    this.userSubject.next(null);
    this.cookieService.delete('user');
    this.cookieService.delete('token');
  }

  // Update user data based on user ID
  updateUserData(userid: number, updatedData: Partial<User>): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.cookieService.get('token')}`
    });
    const fullUrl = `${this.apiUrl}/updateUser/${userid}`;
    return this.http.put(fullUrl, updatedData, { headers });
  }


  // Verify email by sending the verification link
  verifyEmail(userId: number): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.cookieService.get('token')}`
    });
    return this.http.get(`${this.apiUrl}/verify-email/${userId}`, { headers });
  }
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
