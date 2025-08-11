import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SetPasswordComponent } from './set-password.component';
import { AuthGuard } from 'src/app/common/guards/auth.guard';

const routes: Routes = [{
  path: '',
  component: SetPasswordComponent,
  data: {
    title: 'PostNew | Set Password',
    description: 'Set your password for PostNew portal to access services',
    keywords: 'PostNew, set password, authentication, portal',
    robots: 'index, follow',
  },
  canActivate: [AuthGuard]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SetPasswordRoutingModule { }
