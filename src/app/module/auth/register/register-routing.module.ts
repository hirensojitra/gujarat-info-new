import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './register.component';

const routes: Routes = [{
  path: '',
  component: RegisterComponent,
  data: {
    title: 'Gujarat Uvach | Register',
    description: 'Login or register to Gujarat Uvach portal for accessing services',
    keywords: 'Gujarat Uvach, login, register, portal',
    robots: 'index, follow',
    image: 'https://test-ssr-hiren.netlify.app/assets/images/jpg/register.jpg'
  }
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RegisterRoutingModule { }
