import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UnauthorizedComponent } from './unauthorized.component';

const routes: Routes = [{
  path: '',
  component: UnauthorizedComponent,
  data: {
    title: 'Unauthorized Access | PostNew',
    description: 'You do not have permission to access this page. Please log in or contact support for assistance.',
    keywords: 'PostNew, unauthorized, access denied, authentication, portal',
    robots: 'noindex, nofollow',
    author: 'PostNew Team',
    themeColor: '#FF5733',
  }
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UnauthorizedRoutingModule { }
