import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { AuthGuard } from './common/guards/auth.guard';
import { RoleGuard } from './common/guards/role.guard';

const routes: Routes = [
  // Route for dashboard-layout
  {
    path: 'dashboard',
    component: LayoutComponent,
    data: { layout: 'dashboard-layout' },
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        loadChildren: () => import('./module/dashboard/dashboard.module').then((m) => m.DashboardModule)
      },
    ],
  },
  {
    path: 'img',
    component: LayoutComponent,
    data: { layout: 'dashboard-layout', role: ['admin'] },
    canActivate: [AuthGuard, RoleGuard],
    children: [
      {
        path: '',
        loadChildren: () => import('./module/img/img.module').then((m) => m.ImgModule)
      },
    ],
  },
  {
    path: 'user-img',
    component: LayoutComponent,
    data: { layout: 'dashboard-layout' },
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        loadChildren: () => import('./module/user-img/user-img.module').then((m) => m.UserImgModule)
      },
    ],
  },
  {
    path: 'admin',
    component: LayoutComponent,
    data: { layout: 'dashboard-layout' },
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        loadChildren: () => import('./module/admin/admin.module').then((m) => m.AdminModule)
      },
    ],
  },
  {
    path: 'user-profile',
    component: LayoutComponent,
    data: { layout: 'dashboard-layout' },
    canActivate: [AuthGuard],
    children: [
      { path: '', loadChildren: () => import('./module/user-profile/user-profile.module').then(m => m.UserProfileModule) },
    ],
  },

  // Route for empty-layout (auth-related)
  {
    path: 'auth',
    component: LayoutComponent,
    data: { layout: 'empty-layout' },
    children: [
      { path: '', loadChildren: () => import('./module/auth/auth.module').then((m) => m.AuthModule) }
    ],
  },
  // About Us
  {
    path: 'about-us',
    component: LayoutComponent,
    data: { layout: 'empty-layout' },
    children: [
      { path: '', loadChildren: () => import('./module/about-us/about-us.module').then(m => m.AboutUsModule) }
    ],
  },
  {
    path: 'verify-email',
    component: LayoutComponent,
    data: { layout: 'empty-layout' },
    children: [
      { path: '', loadChildren: () => import('./module/email-verification/email-verification.module').then(m => m.EmailVerificationModule) }
    ],
  },
  {
    path: 'broken-pages',
    component: LayoutComponent,
    data: { layout: 'empty-layout' },
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'unauthorized' },
      { path: 'unauthorized', loadChildren: () => import('./module/broken-pages/unauthorized/unauthorized.module').then(m => m.UnauthorizedModule) }
    ],
  },
  // Redirect unmatched paths to auth
  {
    path: '**',
    redirectTo: 'auth/login',
    pathMatch: 'full',
  }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
