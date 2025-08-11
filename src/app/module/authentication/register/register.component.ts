import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthCookieService } from 'src/app/common/services/auth-cookie.service';
import { RegisterService } from 'src/app/common/services/register.service';
import { passwordStrengthValidator } from 'src/app/common/validators/password-strength.validator';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registrationForm!: FormGroup;
  loading = false;
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private registerService: RegisterService,
    private authCookie: AuthCookieService,
    private router: Router
  ) {
    
  }

  ngOnInit(): void {
    this.registrationForm = this.fb.group({
      email: ['hirensojitra007@gmail.com', [Validators.required, Validators.email]],
      pass_key: ['S@jitra95', [Validators.required, passwordStrengthValidator]]
    });
  }

  register(): void {
    if (this.registrationForm.invalid) return;
    const input = this.registrationForm.value;
    this.loading = true;
    console.log(input);
    this.registerService.register(input).subscribe({
      next: (res) => {
        console.log(res)
        this.loading = false;
        this.authCookie.setToken(res.token);
        if (res.is_email_verified) {
          this.router.navigate(['/latest']);
        } else {
          if (res.email_otp_token && res.otp_expires_at) {
            this.authCookie.setOtpToken(res.email_otp_token,res.otp_expires_at)
          }
          this.router.navigate(['/authentication/verify-email'], { queryParams: { user_id: res.user_id } });
        }
      },
      error: (err) => {
        this.loading = false;
        this.errorMessage = err.message || 'Registration failed';
      }
    });
  }
}