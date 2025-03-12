import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registrationForm: FormGroup;
  isLoading: boolean = false;
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.registrationForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      roles: ['user'] // default role; adjust if needed
    });
  }
  
  
  register(): void {
    if (this.registrationForm.invalid) {
      return;
    }
    this.isLoading = true;
    this.errorMessage = '';

    // Call the backend API for standard registration
    this.http.post('/api/auth/register', this.registrationForm.value)
      .pipe(
        catchError(error => {
          this.errorMessage = error.error?.message || 'Registration failed.';
          this.isLoading = false;
          console.log(this.errorMessage)
          return of(null);
        })
      )
      .subscribe((result: any) => {
        this.isLoading = false;
        if (result && result.success) {
          // Redirect to login page or dashboard after successful registration
          this.router.navigate(['/auth/login']);
        } else if (result && result.error) {
          this.errorMessage = result.error;
        }
      });
  }
  
}
