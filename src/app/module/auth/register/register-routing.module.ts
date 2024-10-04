import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './register.component';

const routes: Routes = [{
  path: '',
  component: RegisterComponent,
  data: {
    title: 'Gujarat Info | Register',
    description: 'Login or register to Gujarat Info portal for accessing services',
    keywords: 'Gujarat Info, login, register, portal',
    robots: 'index, follow',
    image: 'https://test-ssr-hiren.netlify.app/assets/images/jpg/register.jpg'
  }
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RegisterRoutingModule { }
