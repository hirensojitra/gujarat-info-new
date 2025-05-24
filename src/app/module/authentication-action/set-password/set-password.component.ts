// src/app/set-password/set-password.component.ts
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, of } from 'rxjs';
import { ToastService } from 'src/app/common/services/toast.service';
import { RegisterService } from 'src/app/common/services/register.service';
import { AuthenticationService } from 'src/app/common/services/authentication.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-set-password',
  templateUrl: './set-password.component.html',
  styleUrls: ['./set-password.component.scss'],
})
export class SetPasswordComponent implements OnInit {
  isLoading = false;
  errorMessage = '';
  newPassword = '';
  confirmPassword = '';
  private userId!: string;

  constructor(
    private router: Router,
    private registerService: RegisterService,
    private authService: AuthenticationService,
    private toast: ToastService,
    private cookie: CookieService
  ) {}

  ngOnInit() {
    this.userId = this.cookie.get('google_user_id');
    if (!this.userId) {
      this.router.navigate(['/']);
    }
  }

  onSubmitNewPassword(): void {
    if (this.newPassword !== this.confirmPassword) {
      this.errorMessage = 'Passwords do not match';
      return;
    }
    this.isLoading = true;
    this.registerService
      .setPassword(this.userId, this.newPassword)
      .pipe(
        catchError((err) => {
          this.isLoading = false;
          this.toast.show(err.message || 'Could not set password', {
            class: 'bg-danger',
          });
          return of(null);
        })
      )
      .subscribe((res) => {
        this.isLoading = false;
        if (res?.token) {
          this.cookie.delete('requires_password');
          this.cookie.delete('google_user_id');
          this.authService.setToken(res.token);
          this.router.navigate(['/home']);
        } else {
          this.errorMessage = 'Unexpected server response';
        }
      });
  }
}
