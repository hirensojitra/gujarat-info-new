import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { AuthGuard } from './common/guards/auth.guard';

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
    data: { layout: 'dashboard-layout' },
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        loadChildren: () => import('./module/img/img.module').then((m) => m.ImgModule)
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
  // Redirect unmatched paths to auth
  {
    path: '**',
    redirectTo: 'auth',
    pathMatch: 'full',
  }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
