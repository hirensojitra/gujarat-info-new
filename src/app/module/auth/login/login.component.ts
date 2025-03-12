import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../../common/services/user.service';
import { AuthService } from '../../../common/services/auth.service';
import { ToastService } from '../../../common/services/toast.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  loginForm: FormGroup;
  isLoading = false;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private authService: AuthService,
    private router: Router,
    private toast: ToastService
  ) {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onSubmit() {
    if (this.loginForm.invalid) return;

    this.isLoading = true;
    const { username, password } = this.loginForm.value;
    this.authService.loginUser(username, password).subscribe({
      next: (response) => {
        if (response.token) {
          console.log(response)
          this.userService.setUser(response);
          this.authService.setToken(response.token);
          this.router.navigate(['/dashboard']);
        }
      },
      error: (error) => {
        this.isLoading = false;
        this.toast.show(error.message || 'Login failed', { class: 'bg-danger' });
      },
      complete: () => {
        this.isLoading = false;
      }
    });
  }
}