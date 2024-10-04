import { Component, OnInit } from '@angular/core';
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
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private authService: AuthService,
    private router: Router,
    private toast: ToastService
  ) {
    // Initialize the login form with validators
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });

  }
  async ngOnInit(): Promise<void> {

  }

  // Handle form submission for login
  onSubmit() {
    if (this.loginForm.valid) {
      const loginData = this.loginForm.value;
      this.authService.loginUser(loginData.username, loginData.password).subscribe(
        response => {
          if (response.error) {
            this.toast.show(response.error, { class: 'bg-danger' })
          }
          else {
            this.authService.setToken(response.token);
            this.userService.setUser(response.user);
            this.router.navigate(['/dashboard']);

          }
        },
        error => {
          console.error('Login error:', error);
        }
      );
    }
  }
}
