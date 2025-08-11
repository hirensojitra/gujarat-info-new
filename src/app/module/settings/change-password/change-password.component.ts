import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { passwordStrengthValidator } from 'src/app/common/validators/password-strength.validator';
import { AuthService } from 'src/app/common/services/auth.service';
import { ToastService } from 'src/app/common/services/toast.service';

export function passwordsMatchValidator(control: AbstractControl): { [key: string]: boolean } | null {
  const newPassword = control.get('newPassword');
  const confirmNewPassword = control.get('confirmNewPassword');

  if (!newPassword || !confirmNewPassword) {
    return null;
  }

  if (newPassword.value !== confirmNewPassword.value) {
    return { 'passwordsMismatch': true };
  }
  return null;
}

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {
  changePasswordForm!: FormGroup;
  loading = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private toast: ToastService
  ) { }

  ngOnInit(): void {
    this.changePasswordForm = this.fb.group({
      currentPassword: ['', Validators.required],
      newPassword: ['', [Validators.required, passwordStrengthValidator]],
      confirmNewPassword: ['', Validators.required]
    }, { validators: passwordsMatchValidator });
  }

  get newPasswordControl() {
    return this.changePasswordForm.get('newPassword');
  }

  get confirmNewPasswordControl() {
    return this.changePasswordForm.get('confirmNewPassword');
  }

  onChangePassword(): void {
    if (this.changePasswordForm.invalid) {
      this.changePasswordForm.markAllAsTouched();
      return;
    }

    this.loading = true;
    const { currentPassword, newPassword } = this.changePasswordForm.value;

    this.authService.changePassword(currentPassword, newPassword).subscribe({
      next: () => {
        this.loading = false;
        this.toast.show('Password changed successfully!', { class: 'bg-success' });
        this.changePasswordForm.reset();
      },
      error: (err) => {
        this.loading = false;
        this.toast.show(err.message || 'Failed to change password.', { class: 'bg-danger' });
      }
    });
  }
}