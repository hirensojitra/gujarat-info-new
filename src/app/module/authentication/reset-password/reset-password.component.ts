// src/app/auth/reset-password/reset-password.component.ts

import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ResetPasswordService } from 'src/app/common/services/reset-password.service';
import { ToastService } from 'src/app/common/services/toast.service';
import { AuthCookieService } from 'src/app/common/services/auth-cookie.service';
import { CookieService } from 'ngx-cookie-service';
import { AuthenticationService } from 'src/app/common/services/authentication.service';
import { Router } from '@angular/router';
import { interval, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit, OnDestroy {
  requestForm!: FormGroup;
  resetForm!: FormGroup;

  step: 1 | 2 = 1;
  loading = false;

  timeLeft = 0;       // seconds until OTP expires

  private destroy$ = new Subject<void>();
  private timerSub: any;

  constructor(
    private fb: FormBuilder,
    private resetSvc: ResetPasswordService,
    private toast: ToastService,
    private authCookie: AuthCookieService,
    private cookieService: CookieService,
    private authService: AuthenticationService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.requestForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    });
    this.resetForm = this.fb.group({
      otp_code: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(6)]],
      new_pass_key: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onRequestOtp(): void {
    if (this.requestForm.invalid) return;

    this.loading = true;
    const email = this.requestForm.value.email;

    this.resetSvc.requestPasswordReset(email)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: payload => {
          this.loading = false;
          this.authCookie.setOtpToken(payload.reset_otp_token, payload.otp_expires_at);
          this.startTimer(new Date(payload.otp_expires_at).getTime());
          this.step = 2;
          this.toast.show('OTP sent. Check your email.', { class: 'bg-success' });
        },
        error: err => {
          this.loading = false;
          this.toast.show(err.message || 'Failed to send OTP.', { class: 'bg-danger' });
        }
      });
  }

  onResetPassword(): void {
    if (this.resetForm.invalid) return;

    this.loading = true;
    const token = this.authCookie.getOtpToken();
    const { otp_code, new_pass_key } = this.resetForm.value;

    this.resetSvc.resetPasswordByOtp({ token, otp_code, new_pass_key })
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: ({ token: authToken, user }) => {
          this.loading = false;
          this.clearTimer();
          this.authCookie.removeOtpToken();
          this.cookieService.delete('otp_expires_at', '/');
          this.authService.saveSession(authToken, user);
          this.toast.show('Password reset successful! You are now logged in.', { class: 'bg-success' });
          this.router.navigate(['/home']);
        },
        error: err => {
          this.loading = false;
          this.toast.show(err.message || 'Reset failed.', { class: 'bg-danger' });
        }
      });
  }

  private startTimer(expiryMs: number): void {
    this.clearTimer();
    this.timeLeft = Math.floor((expiryMs - Date.now()) / 1000);

    this.timerSub = interval(1000)
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.timeLeft--;
        if (this.timeLeft <= 0) {
          this.toast.show('OTP expired. Please request again.', { class: 'bg-danger' });
          this.clearTimer();
          this.step = 1;
        }
      });
  }

  private clearTimer(): void {
    if (this.timerSub) {
      this.timerSub.unsubscribe();
      this.timerSub = null;
    }
  }

  formatTime(seconds: number): string {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s < 10 ? '0' + s : s}`;
  }

  ngOnDestroy(): void {
    // complete our destroy$ to clean up all takeUntil streams
    this.destroy$.next();
    this.destroy$.complete();
    this.clearTimer();
  }
}
