import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PrivacyPolicyComponent } from './privacy-policy.component';

const routes: Routes = [{
  path: '',
  component: PrivacyPolicyComponent,
  data: {
    title: 'Privacy Policy | PostNew',
    description: 'Learn about how PostNew collects, uses, and protects your data in compliance with privacy laws and best practices.',
    keywords: 'Privacy Policy, PostNew, user data, data protection, GDPR, data usage',
    robots: 'index, follow',
  }
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PrivacyPolicyRoutingModule { }
