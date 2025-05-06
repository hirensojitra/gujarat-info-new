import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Apollo } from 'apollo-angular';
import { VERIFY_EMAIL_OTP } from 'src/app/graphql/mutations/register.mutations';
import { ToastService } from 'src/app/common/services/toast.service';
import { RegisterService } from 'src/app/common/services/register.service';
import { CookieService } from 'ngx-cookie-service';
import { LoginService } from 'src/app/common/services/login.service';
import { AuthCookieService } from 'src/app/common/services/auth-cookie.service';

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
  timeLeft: number = 0;
  timerInterval: any;

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private apollo: Apollo,
    private router: Router,
    private toast: ToastService,
    private registerService: RegisterService,
    private loginService: LoginService,
    private authCookie: AuthCookieService,
    private cookieService: CookieService // ✅ Inject CookieService
  ) {}

  ngOnInit(): void {
    this.verifyForm = this.fb.group({
      otp_code: [
        '',
        [Validators.required, Validators.minLength(6), Validators.maxLength(6)],
      ],
    });

    this.route.queryParams.subscribe((params) => {
      this.userId = params['user_id'];
      this.emailOtpToken = this.authCookie.getOtpToken();
      const otpExpiresAtStr = this.cookieService.get('otp_expires_at'); // ✅ Get expiry

      if (!this.emailOtpToken || !otpExpiresAtStr) {
        this.toast.show('Verification session expired.', {
          class: 'bg-danger',
        });
        this.router.navigate(['/authentication/login']);
      } else {
        const expiresAt = new Date(otpExpiresAtStr).getTime(); // milliseconds
        const now = Date.now();
        this.timeLeft = Math.floor((expiresAt - now) / 1000); // seconds

        if (this.timeLeft <= 0) {
          this.toast.show('OTP expired. Please request a new one.', {
            class: 'bg-danger',
          });
          this.authCookie.removeOtpToken();
          this.cookieService.delete('otp_expires_at', '/');
          this.router.navigate(['/authentication/login']);
        } else {
          this.startTimer();
        }
      }
    });
  }

  startTimer(): void {
    this.timerInterval = setInterval(() => {
      if (this.timeLeft > 0) {
        this.timeLeft--;
      } else {
        this.stopTimer();
        this.toast.show('OTP expired. Please request a new one.', {
          class: 'bg-danger',
        });
        this.authCookie.removeOtpToken();
        this.cookieService.delete('otp_expires_at', '/');
        this.router.navigate(['/authentication/login']);
      }
    }, 1000);
  }

  stopTimer(): void {
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
    }
  }

  verifyOtp(): void {
    if (this.verifyForm.invalid) return;
    this.loading = true;

    const otp_code = this.verifyForm.value.otp_code;

    this.apollo
      .mutate({
        mutation: VERIFY_EMAIL_OTP,
        variables: {
          token: this.emailOtpToken,
          otp_code: otp_code,
        },
      })
      .subscribe({
        next: () => {
          this.loading = false;
          this.toast.show('Email verified successfully!', {
            class: 'bg-success',
          });
          this.authCookie.removeOtpToken();
          this.cookieService.delete('otp_expires_at', '/');
          this.stopTimer();
          this.autoLoginAfterVerification();
        },
        error: (err) => {
          this.loading = false;
          this.toast.show(err.message || 'Verification failed.', {
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
  autoLoginAfterVerification(): void {
    const email = this.registerService.getEmail();
    const password = this.registerService.getPassKey();
    console.log(email, password);
    if (!email || !password) {
      this.toast.show('Session expired. Please login again.', {
        class: 'bg-danger',
      });
      this.router.navigate(['/auth/login']);
      return;
    }

    // ✅ Call login mutation
    this.loginService
      .login({ login_id: email, pass_key: password })
      .subscribe({
        next: (res) => {
          this.loading = false;
          this.authCookie.setToken(res.token);
          this.toast.show('Logged in successfully!', { class: 'bg-success' });
          // this.router.navigate(['/dashboard']);
        },
        error: (err) => {
          this.loading = false;
          this.toast.show('Login failed. Please try again.', {
            class: 'bg-danger',
          });
          this.router.navigate(['/auth/login']);
        },
      });
  }
  ngOnDestroy(): void {
    this.stopTimer();
  }
}
