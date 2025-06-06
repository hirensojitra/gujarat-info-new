import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { finalize, firstValueFrom } from 'rxjs';
import { TokenValidationResponse } from 'src/app/common/interfaces/auth.types';
import { AuthService } from 'src/app/common/services/auth.service';
import { PlatformService } from 'src/app/common/services/platform.service';
import { ToastService } from 'src/app/common/services/toast.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit, AfterViewInit {
  resetPasswordForm: FormGroup;
  token: string;
  email: string;
  isLoading = false;
  isTokenValid: boolean = true;
  isTokenChecked = false;
  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private toast: ToastService,
    private platformService: PlatformService
  ) { }

  async ngOnInit(): Promise<void> {

  }
  async ngAfterViewInit(): Promise<void> {
    if (this.platformService.isBrowser()) {
      this.token = this.route.snapshot.queryParams['token'];
      this.email = this.route.snapshot.queryParams['email'];

      await this.validateToken();
      this.resetPasswordForm = this.fb.group({
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', [Validators.required]]
      }, { validator: this.passwordsMatchValidator });
    }
  }
  async validateToken(): Promise<void> {
    try {
      const response: TokenValidationResponse = await firstValueFrom(
        this.authService.validateResetToken(this.token, this.email).pipe(finalize(() => this.isTokenChecked = true))
      );
      this.isTokenValid = response.success;
    } catch (error) {
      this.toast.show(error, { class: 'bg-danger' });
      this.isTokenValid = false;
    }
  }

  passwordsMatchValidator(form: FormGroup) {
    return form.get('password').value === form.get('confirmPassword').value
      ? null
      : { mismatch: true };
  }

  onSubmit(): void {
    if (this.resetPasswordForm.invalid) {
      return;
    }

    this.isLoading = true;
    const password = this.resetPasswordForm.get('password').value;

    this.authService.resetPassword(this.token, this.email, password).subscribe(
      (response) => {
        this.isLoading = false;
        this.toast.show('Password reset successfully', { class: 'bg-success' });
        this.router.navigate(['/login']);
      },
      (error) => {
        this.isLoading = false;
        if (error === 'Token expired') {
          this.toast.show('Reset token has expired. Please request a new one.', { class: 'bg-danger' });
          this.router.navigate(['/auth/forgot-password']);
        } else {
          this.toast.show('Error resetting password', { class: 'bg-danger' });
        }
      }
    );
  }

  navigateToForgotPassword() {
    this.router.navigate(['/auth/forgot-password']);
  }
}
