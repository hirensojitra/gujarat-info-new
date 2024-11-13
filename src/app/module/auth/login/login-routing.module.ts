import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login.component';

const routes: Routes = [{
  path: '',
  component: LoginComponent,
  data: {
    title: 'PostNew | Authentication',
    description: 'Login or register to PostNew portal for accessing services',
    keywords: 'PostNew, login, register, authentication, portal',
    robots: 'index, follow',
  }
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoginRoutingModule { }
