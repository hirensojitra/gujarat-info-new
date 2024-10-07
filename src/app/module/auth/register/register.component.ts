import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Md5 } from 'ts-md5/dist/md5';
import { UserService } from '../../../common/services/user.service';
import { ToastService } from '../../../common/services/toast.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  registrationForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router,
    private toast: ToastService
  ) {
    // Initialize the registration form with validators
    this.registrationForm = this.fb.group({
      username: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      roles: ['user'], // Default role, adjust as necessary
      emailVerified: [false], // Default value
    });
  }

  ngOnInit(): void { }

  // Method to register a user
  register(): void {
    const pass = this.registrationForm.get('password')?.value;
    const md5 = new Md5();
    // this.registrationForm.get('password')?.setValue(md5.appendStr(pass).end() as string);

    if (this.registrationForm.valid) {
      const { username, password, email, emailVerified } = this.registrationForm.value;
      const roles = ['user'];

      this.userService.registerUser(username, password, email, roles, emailVerified).subscribe(
        response => {
          response.error ? this.toast.show(response.error, { class: 'bg-danger' }) : this.router.navigate(['/auth']);
        },
        error => {
          console.error('Error registering user:', error);
        }
      );
    } else {
      this.markFormGroupTouched(this.registrationForm);
    }
    this.registrationForm.get('password')?.setValue(pass);
  }

  // Method to mark form controls as touched for validation feedback
  private markFormGroupTouched(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach((key) => {
      const control = formGroup.controls[key];
      control.markAsTouched();
      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }
}