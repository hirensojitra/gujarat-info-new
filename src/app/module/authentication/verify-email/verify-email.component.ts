import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  VERIFY_EMAIL_OTP,
  RESEND_EMAIL_OTP,
} from 'src/app/graphql/mutations/register.mutations';
import { ToastService } from 'src/app/common/services/toast.service';
import { RegisterService } from 'src/app/common/services/register.service';
import { CookieService } from 'ngx-cookie-service';
import { LoginService } from 'src/app/common/services/login.service';
import { AuthCookieService } from 'src/app/common/services/auth-cookie.service';
import { Apollo } from 'apollo-angular';
import { Subscription, catchError, interval, throwError } from 'rxjs';
import { AuthenticationService } from 'src/app/common/services/authentication.service';
import { UserPublicInfo } from 'src/app/graphql/types/login.types';

@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.component.html',
  styleUrls: ['./verify-email.component.scss'],
})
export class VerifyEmailComponent implements OnInit, OnDestroy {
  verifyForm!: FormGroup;
  loading = false;
  errorMessage = '';

  userId = '';
  emailOtpToken = '';
  timeLeft = 0; // seconds remaining on OTP
  resendCooldown = 0; // seconds until "Resend" re-enables

  user: UserPublicInfo | null = null;
  private timerSub?: Subscription;
  private cooldownSub?: Subscription;
  private subscriptions = new Subscription();

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private apollo: Apollo,
    private router: Router,
    private toast: ToastService,
    private registerService: RegisterService,
    private loginService: LoginService,
    private authCookie: AuthCookieService,
    private cookieService: CookieService,
    private authService: AuthenticationService
  ) {}

  ngOnInit(): void {
    this.subscriptions.add(
      this.authService.user$.subscribe((u) => {
        this.user = u;
        console.log('user', this.user);
      })
    );
    this.verifyForm = this.fb.group({
      otp_code: [
        '',
        [Validators.required, Validators.minLength(6), Validators.maxLength(6)],
      ],
    });

    // grab the OTP token + expiry from cookies
    this.emailOtpToken = this.authCookie.getOtpToken();
    const otpExpiresAtStr = this.cookieService.get('otp_expires_at');
    if (!this.emailOtpToken || !otpExpiresAtStr) {
      this.toast.show('Verification session expired.', { class: 'bg-danger' });
      // this.router.navigate(['/authentication/login']);
      return;
    }

    const expiresAt = new Date(otpExpiresAtStr).getTime();
    const now = Date.now();
    this.timeLeft = Math.floor((expiresAt - now) / 1000);

    if (this.timeLeft <= 0) {
      this.expireSession();
    } else {
      this.startTimer();
    }

    // ensure resend starts off enabled
    this.resendCooldown = 0;
  }

  private startTimer(): void {
    this.timerSub = interval(1000).subscribe(() => {
      this.timeLeft--;
      if (this.timeLeft <= 0) {
        this.expireSession();
      }
    });
  }

  private expireSession(): void {
    this.stopTimer();
    this.toast.show('OTP expired. Please request a new one.', {
      class: 'bg-danger',
    });
    this.authCookie.removeOtpToken();
    this.cookieService.delete('otp_expires_at', '/');
    this._navigateToLogin(this.router.url);
  }

  private stopTimer(): void {
    this.timerSub?.unsubscribe();
  }

  verifyOtp(): void {
    if (this.verifyForm.invalid) return;
    this.loading = true;
    const otp_code = this.verifyForm.value.otp_code;
    const token = this.emailOtpToken;
    this.registerService
      .verifyOtp(token, otp_code)
      .pipe(
        catchError((err) => {
          this.loading = false;
          this.toast.show(err.message || 'Verification failed.', {
            class: 'bg-danger',
          });
          return throwError(() => err);
        })
      )
      .subscribe(({ token: authToken, user }) => {
        this.loading = false;

        // Save token + user into your AuthService
        this.authService.saveSession(authToken, user);

        this.toast.show('Email verified successfully!', {
          class: 'bg-success',
        });
        this.clearSession();

        // Now that we’re logged in, redirect to dashboard/home
        this._navigateToHome();
      });
  }

  onResend(): void {
    if (this.resendCooldown > 0) return;
    const email = this.user.email;
    if (!email) {
      this.toast.show('Session expired. Please login again.', {
        class: 'bg-danger',
      });
      this._navigateToLogin(this.router.url);
      return;
    }

    this.registerService.resendOtp(email).subscribe({
      next: ({ data }) => {
        const { email_otp_token, otp_expires_at } = data!.resendEmailOtp;
        // store new token + expiry
        this.authCookie.setOtpToken(email_otp_token, otp_expires_at);
        this.emailOtpToken = email_otp_token;
        // reset timers
        this.stopTimer();
        const expiresAtMs = new Date(otp_expires_at).getTime();
        this.timeLeft = Math.floor((expiresAtMs - Date.now()) / 1000);
        this.startTimer();

        // start 30s resend cooldown
        this.resendCooldown = 30;
        this.cooldownSub = interval(1000).subscribe(() => {
          this.resendCooldown--;
          if (this.resendCooldown <= 0) {
            this.cooldownSub?.unsubscribe();
          }
        });

        this.toast.show('OTP resent. Check your inbox.', {
          class: 'bg-success',
        });
      },
      error: (err) => {
        this.toast.show(err.message || 'Could not resend OTP.', {
          class: 'bg-danger',
        });
      },
    });
  }

  formatTime(seconds: number): string {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? '0' + secs : secs}`;
  }
  private autoLoginAfterVerification(): void {
    const email = this.registerService.getEmail();
    const pass = this.registerService.getPassKey();
    if (!email || !pass) {
      this.toast.show('Session expired. Please login again.', {
        class: 'bg-danger',
      });
      this._navigateToLogin(this.router.url);
      return;
    }
    this.loginService.login({ login_id: email, pass_key: pass }).subscribe({
      next: (res) => {
        this.authCookie.setToken(res.token);
        this.toast.show('Logged in successfully!', { class: 'bg-success' });
        this._navigateToHome();
      },
      error: () => {
        this.toast.show('Login failed. Please try again.', {
          class: 'bg-danger',
        });
        this._navigateToLogin(this.router.url);
      },
    });
  }

  private clearSession(): void {
    this.stopTimer();
    this.cooldownSub?.unsubscribe();
    this.authCookie.removeOtpToken();
    this.cookieService.delete('otp_expires_at', '/');
  }

  ngOnDestroy(): void {
    this.clearSession();
  }

  private _navigateToLogin(returnUrl?: string): void {
    this.router.navigate(['/authentication/login'], {
      queryParams: { returnUrl },
      queryParamsHandling: 'merge',
    });
  }

  private _navigateToHome(): void {
    this.router.navigate(['/home']);
  }
}