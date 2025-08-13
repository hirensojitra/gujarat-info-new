import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { AuthCookieService } from './auth-cookie.service';
import { UserPublicInfo } from 'src/app/graphql/types/login.types';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  private userSubject = new BehaviorSubject<UserPublicInfo | null>(
    this.loadUser()
  );
  public user$ = this.userSubject.asObservable();
  private apiUrl = environment.MasterApi + '/auth/avatar/';
  constructor(private authCookie: AuthCookieService, private router: Router) {}
  private loadUser(): UserPublicInfo | null {
    const user = this.authCookie.getUser();
    return user;
  }

  /** Get the current user value */
  public getUser(): UserPublicInfo | null {
    const u = this.userSubject.value;
    if (u) u.image = u.image || `${this.apiUrl}${u.id}`;
    return this.userSubject.value;
  }

  /** Save user in a cookie and broadcast it */
  public setUser(user: UserPublicInfo, rememberMe: boolean = false): void {
    this.authCookie.setUser(user, rememberMe);
    this.userSubject.next(user);
  }

  /** Safely update just the image URL */
  public setImageUrl(imageUrl: string | null): void {
    const currentUser = this.getUser();
    if (currentUser) {
      const updatedUser = { ...currentUser, image: imageUrl }; // clone to prevent mutation loop
      this.setUser(updatedUser);
    }
  }

  /** Store the JWT in its own cookie */
  public setToken(token: string, rememberMe: boolean = false): void {
    this.authCookie.setToken(token, rememberMe);
  }

  /** Retrieve JWT */
  public getToken(): string | null {
    return this.authCookie.getToken();
  }

  /** Clear cookies and broadcast logout */
  public logout(): void {
    this.authCookie.removeToken();
    this.authCookie.removeUser();
    this.userSubject.next(null);
    this.router.navigate(['/authentication/login']);
  }

  /** True if both token & user are present */
  public isLoggedIn(): boolean {
    return !!this.getToken() && !!this.getUser();
  }

  /** Save both token and user in session */
  public saveSession(
    token: string,
    user: UserPublicInfo,
    rememberMe: boolean = false
  ): void {
    this.setToken(token, rememberMe);
    this.setUser(user, rememberMe);
  }
}
