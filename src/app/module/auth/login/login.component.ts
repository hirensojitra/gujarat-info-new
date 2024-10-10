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
          if (response.token) {
            this.userService.setUser(response);  // Passing the entire response since it includes user data
            this.authService.setToken(response.token);
            this.userService.getUser().subscribe(data => {
              console.log(data)
            })
            this.router.navigate(['/dashboard']);
          } else if (response.error) {
            // Handle error and show toast notification for error message
            this.toast.show(response.error, { class: 'bg-danger' });
          }
        },
        error => {
          // Handle network or server errors
          console.error('Login error:', error);
          this.toast.show('An error occurred during login', { class: 'bg-danger' });
        }
      );
    }
  }


}
