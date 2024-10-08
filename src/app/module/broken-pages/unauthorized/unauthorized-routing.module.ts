import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UnauthorizedComponent } from './unauthorized.component';

const routes: Routes = [{
  path: '',
  component: UnauthorizedComponent,
  data: {
    title: 'Unauthorized Access | Gujarat Uvach',
    description: 'You do not have permission to access this page. Please log in or contact support for assistance.',
    keywords: 'Gujarat Uvach, unauthorized, access denied, authentication, portal',
    robots: 'noindex, nofollow',
    author: 'Gujarat Uvach Team',
    themeColor: '#FF5733',
  }
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UnauthorizedRoutingModule { }
