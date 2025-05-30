import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './register.component';

const routes: Routes = [{
  path: '',
  component: RegisterComponent,
  data: {
    title: 'PostNew | Register',
    description: 'Login or register to PostNew portal for accessing services',
    keywords: 'PostNew, login, register, portal',
    robots: 'index, follow',
    image: 'https://test-ssr-hiren.netlify.app/assets/images/jpg/register.jpg'
  }
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RegisterRoutingModule { }
