import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../common/services/user.service';
import { User } from '../../common/interfaces/commonInterfaces';

@Component({
  selector: 'app-email-verification',
  templateUrl: './email-verification.component.html',
  styleUrls: ['./email-verification.component.scss']
})
export class EmailVerificationComponent implements OnInit {
  verificationStatus: string = 'Verifying...';
  user: User;
  isVerified: boolean = false;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userservice: UserService
  ) { }

  async ngOnInit(): Promise<void> {
    await this.userservice.getUser().subscribe((user) => {
      this.user = user;
    })
    await this.route.queryParams.subscribe(params => {
      const token = params['token'];
      const email = params['email'];

      if (token && email) {
        if (this.user && !this.user.emailverified) {
          this.userservice.verifyEmail(token, email).subscribe(
            (response) => {
              if (response.success) {
                this.verificationStatus = 'Your email has been successfully verified!';
                if (this.user) { this.user.emailverified = true; }
                this.isVerified = true;
                this.userservice.setUser(this.user);
              } else {
                this.verificationStatus = 'Email verification failed. The token may be expired or invalid.';

                this.isVerified = false;
              }
            },
            (error) => {
              console.error(error);
              this.verificationStatus = 'An error occurred while verifying your email. Please try again later.';
              this.isVerified = false;
            }
          );
        } else {
          this.verificationStatus = 'Your email has been successfully verified already!';
          this.isVerified = true;
        }
      } else {
        this.verificationStatus = 'Invalid verification link.';
      }
    });
  }

  // Optional: Redirect the user after verification
  redirectToLogin(): void {
    if (this.isVerified) {
      this.router.navigate(['/login']);
    }
  }
}
