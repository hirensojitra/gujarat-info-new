import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root',
})
export class AuthCookieService {
  constructor(private cookie: CookieService) {}
  setToken(token: string): void {
    this.cookie.set('token', token, {
      path: '/',
      secure: window.location.protocol === 'https:',
      sameSite: 'Lax',
    });
  }

  getToken(): string {
    return this.cookie.get('token');
  }

  clearToken(): void {
    this.cookie.delete('token', '/');
  }

  // ── E-mail OTP (if you use it) ───────────────────────────────────────────────
  setOtp(otpToken: string, expiresAt: string): void {
    const common = {
      path: '/',
      secure: window.location.protocol === 'https:',
      sameSite: 'Lax',
    } as const;

    this.cookie.set('email_otp_token', otpToken, common);
    this.cookie.set('otp_expires_at',  expiresAt, common);
  }
  removeOtpToken(): void {
    this.cookie.delete('email_otp_token', '/');
  }
  getOtpToken(): string {
    return this.cookie.get('email_otp_token');
  }

  clearOtp(): void {
    this.cookie.delete('email_otp_token', '/');
    this.cookie.delete('otp_expires_at',  '/');
  }
  async isLoggedIn(): Promise<boolean> {
    const token = this.getToken();
    if (!token) {
      return false;
    }
    try {
      const decoded: any = jwtDecode(token);
      const now = Date.now() / 1000;
      if (decoded.exp && decoded.exp < now) {
        this.clearToken();
        return false;
      }
      return true;
    } catch {
      this.clearToken();
      return false;
    }
  }
  async isEmailVerified(): Promise<boolean> {
    const token = this.getToken();
    if (!token) {
      return false;
    }
    try {
      const decoded: any = jwtDecode(token);
      return decoded.is_email_verified === true;
    } catch {
      return false;
    }
  }
}
