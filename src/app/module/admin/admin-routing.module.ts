import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { RoleGuard } from '../../common/guards/role.guard';
import { AuthGuard } from '../../common/guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    data: {
      title: 'Gujarat Info | Admin',
      description: 'Login or register to Gujarat Info portal for accessing services',
      keywords: 'Gujarat Info, login, register, authentication, portal',
      robots: 'index, follow',
    },
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'users' },
      { path: 'users', loadChildren: () => import('./users/users.module').then(m => m.UsersModule), data: { role: ['admin'] }, canActivate: [AuthGuard, RoleGuard] }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
