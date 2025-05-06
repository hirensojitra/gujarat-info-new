import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ResetPasswordComponent } from './reset-password.component';

const routes: Routes = [{
    path: '',
    component: ResetPasswordComponent,
    data: {
      title: 'Reset Password',
      description: 'Reset your password using email',
      keywords: 'Forgot password, reset password',
      robots: 'noindex, nofollow'
    }
  }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ResetPasswordRoutingModule { }
