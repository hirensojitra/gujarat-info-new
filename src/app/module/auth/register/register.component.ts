import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../../common/services/user.service';
import { ToastService } from '../../../common/services/toast.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  registrationForm: FormGroup;
  isSubmitting = false;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router,
    private toast: ToastService
  ) {
    this.registrationForm = this.fb.group({
      username: ['', [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(20),
        Validators.pattern('^[a-zA-Z][a-zA-Z0-9_]*$')
      ]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      roles: ['user'],
      emailVerified: [false]
    });
  }

  register(): void {
    if (this.registrationForm.invalid || this.isSubmitting) {
      this.markFormGroupTouched(this.registrationForm);
      return;
    }

    this.isSubmitting = true;
    const formData = this.registrationForm.value;

    this.userService.registerUser({
      username: formData.username,
      password: formData.password,
      email: formData.email,
      roles: [formData.roles], // Convert to array to match API expectations
      emailVerified: formData.emailVerified
    }).subscribe({
      next: () => {
        this.router.navigate(['/auth']);
        this.toast.show('Registration successful!', { class: 'bg-success' });
      },
      error: (error) => {
        this.toast.show(error.message || 'Registration failed', { class: 'bg-danger' });
        this.isSubmitting = false;
      },
      complete: () => this.isSubmitting = false
    });
  }

  private markFormGroupTouched(formGroup: FormGroup): void {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();
      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }
}