import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { User } from '../interfaces/commonInterfaces';
import { environment } from '../../../environments/environment';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private userSubject = new BehaviorSubject<User | null>(null);
  private apiUrl = `${environment.MasterApi}/auth`;
  private cookieOptions = {
    path: environment.cookieConfig.path,
    secure: environment.cookieConfig.secure,
    sameSite: environment.cookieConfig.sameSite as 'Lax' | 'Strict' | 'None',
    httpOnly: environment.cookieConfig.httpOnly,
  };

  constructor(
    private http: HttpClient,
    private cookieService: CookieService
  ) {
    this.initializeUser();
  }

  private initializeUser(): void {
    const storedUser = this.cookieService.get('user');
    
    if (!storedUser || storedUser === 'null') {
      this.clearUserData();
      return;
    }

    try {
      const parsedUser: User = JSON.parse(storedUser);
      if (parsedUser && parsedUser.username) {
        this.userSubject.next(parsedUser);
      } else {
        this.clearUserData();
      }
    } catch (error) {
      console.error('Invalid user data in cookie:', error);
      this.clearUserData();
    }
  }

  getUser(): Observable<User | null> {
    return this.userSubject.asObservable();
  }

  getFullName(): string {
    const user = this.userSubject.value;
    return user ? `${user.firstname || ''} ${user.lastname || ''}`.trim() : 'User';
  }

  setUser(user: User | null): void {
    console.log(user)
    
    if (!user) {
      this.clearUserData();
      return;
    }
    this.cookieService.set('user', JSON.stringify(user), {
      path: '/', // Ensures the cookie is available throughout the application
      secure: false // Set to true if you're using HTTPS
    });

    this.cookieService.set('user', JSON.stringify(user), this.cookieOptions);
    this.userSubject.next(user);
  }

  getAllUsers(paramsObj: {
    page?: number;
    limit?: number;
    search?: string;
    sortBy?: string;
    order?: string;
  } = {}): Observable<any> {
    const params = new HttpParams({ fromObject: {
        page: paramsObj.page?.toString() ?? '1',
        limit: paramsObj.limit?.toString() ?? '10',
        search: paramsObj.search ?? '',
        sortBy: paramsObj.sortBy ?? 'created_at',
        order: paramsObj.order ?? 'asc'
      }
    });

    return this.http.get(`${this.apiUrl}/users`, { headers: this.authHeaders, params })
      .pipe(catchError(this.handleError));
  }

  updateUser(userId: string, updates: Partial<User>): Observable<any> {
    console.log(updates)
    return this.http.put(`${this.apiUrl}/updateUser/${userId}`, updates, { headers: this.authHeaders })
      .pipe(catchError(this.handleError));
  }

  verifyEmail(token: string, email: string): Observable<any> {
    const params = new HttpParams().set('token', token).set('email', email);
    return this.http.get(`${this.apiUrl}/verify-email`, { headers: this.authHeaders, params })
      .pipe(catchError(this.handleError));
  }

  registerUser(userData: {
    username: string;
    password: string;
    email: string;
    roles: string[];
    emailVerified: boolean;
  }): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, userData)
      .pipe(catchError(this.handleError));
  }

  private get authHeaders(): HttpHeaders {
    const token = this.cookieService.get('token');
    return token ? new HttpHeaders({ 'Authorization': `Bearer ${token}` }) : new HttpHeaders();
  }

  private clearUserData(): void {
    this.cookieService.delete('user', this.cookieOptions.path);
    this.userSubject.next(null);
  }

  private handleError(error: HttpErrorResponse) {
    console.error('API Error:', error);
    const errorMessage = error.error?.message || 'User operation failed';
    return throwError(() => new Error(errorMessage));
  }
}
