import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticationActionComponent } from './authentication-action.component';

const routes: Routes = [
  {
    path: '',
    component: AuthenticationActionComponent,
    data: {
      title: 'PostNew | Authentication Action',
      description: 'Login or register to PostNew portal for accessing services',
      keywords: 'PostNew, login, register, authentication Action, portal',
      robots: 'index, follow',
    },
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'set-password' },
      { path: 'set-password', loadChildren: () => import('./set-password/set-password.module').then((m) => m.SetPasswordModule)}
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthenticationActionRoutingModule {}
