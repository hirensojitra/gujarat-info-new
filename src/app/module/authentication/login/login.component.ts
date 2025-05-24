import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/common/services/authentication.service';
import { LoginService } from 'src/app/common/services/login.service';
import { ToastService } from 'src/app/common/services/toast.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  loading = false;
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private loginService: LoginService,
    private authService: AuthenticationService,
    private router: Router,
    private toast: ToastService
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      login_id: ['', [Validators.required]],
      pass_key: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  login(): void {
    if (this.loginForm.invalid) return;
    this.loading = true;
    const input = this.loginForm.value;
    this.loginService.login(input).subscribe({
      next: (res) => {
        this.loading = false;
        this.authService.saveSession(res.token, res.user); // ✅ store both token and user
        this.toast.show('Login successful!', { class: 'bg-success' });
        res.user.email_verified?this.router.navigate(['/home']):this.router.navigate(['/authentication/verify-email']);
      },
      error: (err) => {
        this.loading = false;
        console.log(err);
        this.toast.show(err.message || 'Login failed.', { class: 'bg-danger' });
      },
    });
  }
}
