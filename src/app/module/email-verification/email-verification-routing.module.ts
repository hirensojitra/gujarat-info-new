import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmailVerificationComponent } from './email-verification.component';

const routes: Routes = [{
  path: '',
  component: EmailVerificationComponent,
  data: {
    title: 'Email Verification | PostNew',
    description: 'Welcome to the PostNew dashboard. Access a variety of services and features designed to enhance your experience.',
    keywords: 'PostNew, services, dashboard, user portal, features, access',
    robots: 'index, follow',
  }
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmailVerificationRoutingModule { }
