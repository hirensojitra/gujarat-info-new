import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login.component';

const routes: Routes = [{
  path: '',
  component: LoginComponent,
  data: {
    title: 'Gujarat Uvach | Authentication',
    description: 'Login or register to Gujarat Uvach portal for accessing services',
    keywords: 'Gujarat Uvach, login, register, authentication, portal',
    robots: 'index, follow',
  }
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoginRoutingModule { }
