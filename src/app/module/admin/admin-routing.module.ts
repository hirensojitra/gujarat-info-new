import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { RolesGuard } from '../../common/guards/roles.guard';
import { AuthGuard } from '../../common/guards/auth.guard';
import { NewAuthGuard } from 'src/app/common/guards/new-auth.guard';
import { RoleGuard } from 'src/app/common/guards/role.guard';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    data: {
      title: 'PostNew | Admin',
      description: 'Login or register to PostNew portal for accessing services',
      keywords: 'PostNew, login, register, authentication, portal',
      robots: 'index, follow',
    },
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'users' },
      { path: 'users', loadChildren: () => import('./users/users.module').then(m => m.UsersModule), data: { roles: ['administrator','owner'] }, canActivate: [NewAuthGuard, RoleGuard] }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
