import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { CookieService } from 'ngx-cookie-service';
import { environment } from 'src/environments/environment';
import { UserPublicInfo } from 'src/app/graphql/types/login.types';

@Injectable({
  providedIn: 'root',
})
export class AuthCookieService {
  private cookieOptions = {
    path: '/',
    secure: environment.production, // Use secure cookies in production
    sameSite: 'Strict' as const,
    httpOnly: false, // Set to true if using SameSite=None
  };

  constructor(private cookie: CookieService) {}

  setToken(token: string, rememberMe: boolean = false): void {
    const expires = rememberMe ? this.getFutureDate(30) : undefined;
    this.cookie.set('token', token, {
      ...this.cookieOptions,
      expires: expires,
    });
  }

  getToken(): string | null {
    return this.cookie.get('token') || null;
  }

  removeToken(): void {
    this.cookie.delete('token', this.cookieOptions.path);
  }

  setUser(user: UserPublicInfo, rememberMe: boolean = false): void {
    console.log('Setting user in cookie:', JSON.stringify(user)); // Add this line for debugging
    const expires = rememberMe ? this.getFutureDate(30) : undefined;
    this.cookie.set('user', JSON.stringify(user), {
      ...this.cookieOptions,
      expires: expires,
    });
  }

  getUser(): UserPublicInfo | null {
    const userJson = this.cookie.get('user');
    console.log('Raw user JSON from cookie:', userJson); // Add this line
    return userJson ? JSON.parse(userJson) : null;
  }

  removeUser(): void {
    this.cookie.delete('user', this.cookieOptions.path);
  }

  setOtpToken(token: string, expiresAt: string): void {
    const expiryDate = new Date(expiresAt);
    this.cookie.set('otp_token', token, {
      ...this.cookieOptions,
      expires: expiryDate,
    });
    this.cookie.set('otp_expires_at', expiresAt, {
      ...this.cookieOptions,
      expires: expiryDate,
    });
  }

  getOtpToken(): string | null {
    return this.cookie.get('otp_token') || null;
  }

  removeOtpToken(): void {
    this.cookie.delete('otp_token', this.cookieOptions.path);
    this.cookie.delete('otp_expires_at', this.cookieOptions.path);
  }

  isLoggedIn(): boolean {
    return !!this.getToken() && !!this.getUser();
  }

  isEmailVerified(): boolean {
    const user = this.getUser();
    return user ? user.email_verified : false;
  }

  private getFutureDate(days: number): Date {
    const date = new Date();
    date.setDate(date.getDate() + days);
    return date;
  }
}
