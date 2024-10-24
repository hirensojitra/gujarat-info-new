import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastService } from '../../../common/services/toast.service';
import { AuthService } from 'src/app/common/services/auth.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  forgotPasswordForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private toast: ToastService,
    private router: Router
  ) {
    this.forgotPasswordForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  ngOnInit(): void { }

  // Method to submit forgot password request
  submitRequest(): void {
    if (this.forgotPasswordForm.valid) {
      const email = this.forgotPasswordForm.get('email')?.value;
      this.authService.requestPasswordReset(email).subscribe(
        response => {
          if (response.success) {
            this.toast.show('Password reset link sent to your email.', { class: 'bg-success' });
            this.router.navigate(['/auth/login']);
          } else {
            this.toast.show(response.error, { class: 'bg-danger' });
          }
        },
        error => {
          console.error('Error requesting password reset:', error);
          this.toast.show('Error occurred while processing your request.', { class: 'bg-danger' });
        }
      );
    } else {
      this.markFormGroupTouched(this.forgotPasswordForm);
    }
  }

  // Method to mark form controls as touched for validation feedback
  private markFormGroupTouched(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach((key) => {
      const control = formGroup.controls[key];
      control.markAsTouched();
    });
  }
}
