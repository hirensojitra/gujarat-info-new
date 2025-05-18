// src/app/common/services/authentication.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { UserPublicInfo } from 'src/app/graphql/types/login.types';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  private userSubject = new BehaviorSubject<UserPublicInfo | null>(this.loadUser());
  public user$ = this.userSubject.asObservable();

  constructor(private cookie: CookieService, private router: Router) {}

  /** Read & parse the `user` cookie on startup */
  private loadUser(): UserPublicInfo | null {
    const json = this.cookie.get('user');
    try {
      return json ? JSON.parse(json) : null;
    } catch {
      return null;
    }
  }

  /** Get the current user value */
  public getUser(): UserPublicInfo | null {
    return this.userSubject.value;
  }

  /** Save user in a cookie and broadcast it */
  public setUser(user: UserPublicInfo): void {
    const json = JSON.stringify(user);
    const secure = window.location.protocol === 'https:';
    this.cookie.set('user', json, 7, '/', undefined, secure, 'Lax');
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
  public setToken(token: string): void {
    const secure = window.location.protocol === 'https:';
    this.cookie.set('token', token, 7, '/', undefined, secure, 'Lax');
  }

  /** Retrieve JWT */
  public getToken(): string {
    return this.cookie.get('token');
  }

  /** Clear cookies and broadcast logout */
  public logout(): void {
    this.cookie.delete('token', '/');
    this.cookie.delete('user', '/');
    this.userSubject.next(null);
    this.router.navigate(['/authentication/login']);
  }

  /** True if both token & user are present */
  public isLoggedIn(): boolean {
    return !!this.getToken() && !!this.getUser();
  }

  /** Save both token and user in session */
  public saveSession(token: string, user: UserPublicInfo): void {
    this.cookie.deleteAll('/');
    const isSecure = window.location.protocol === 'https:';
    this.cookie.set('token', token, {
      path: '/',
      secure: isSecure,
      sameSite: 'Lax',
    });
    this.setUser(user);
    console.log(token);
  }
}
