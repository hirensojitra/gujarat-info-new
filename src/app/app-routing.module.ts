import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { AuthGuard } from './common/guards/auth.guard';
import { RolesGuard } from './common/guards/roles.guard';
import { NewAuthGuard } from './common/guards/new-auth.guard';
import { RoleGuard } from './common/guards/role.guard';
import { FrameManagementModule } from './module/frame-management/frame-management.module';

const routes: Routes = [
  { path: '', redirectTo: 'latest', pathMatch: 'full' },
  {
    path: '',
    component: LayoutComponent,
    data: { layout: 'empty-layout' },
    children: [
      {
        path: 'home',
        canActivate: [NewAuthGuard],
        children: [
          {
            path: '',
            loadChildren: () =>
              import('./module/home/home.module').then((m) => m.HomeModule),
          },
        ],
      },
      {
        path: 'broken-pages',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('./module/broken-pages/broken-pages.module').then(
                (m) => m.BrokenPagesModule
              ),
          },
        ],
      },
      {
        path: 'poster/:img',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('./module/poster/poster.module').then(
                (m) => m.PosterModule
              ),
          },
        ],
      },
      {
        path: 'auth',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('./module/auth/auth.module').then((m) => m.AuthModule),
          },
        ],
      },
      {
        path: 'authentication',
        loadChildren: () =>
          import('./module/authentication/authentication.module').then(
            (m) => m.AuthenticationModule
          ),
      },
      {
        path: 'about-us',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('./module/about-us/about-us.module').then(
                (m) => m.AboutUsModule
              ),
          },
        ],
      },
      {
        path: 'privacy-policy',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('./module/privacy-policy/privacy-policy.module').then(
                (m) => m.PrivacyPolicyModule
              ),
          },
        ],
      },
      {
        path: 'data-deletion-instructions',
        children: [
          {
            path: '',
            loadChildren: () =>
              import(
                './module/data-deletion-instructions/data-deletion-instructions.module'
              ).then((m) => m.DataDeletionInstructionsModule),
          },
        ],
      },
      {
        path: 'latest',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('./module/latest/latest.module').then(
                (m) => m.LatestModule
              ),
          },
        ],
      },
      {
        path: 'img-upload',
        component: LayoutComponent,
        data: { roles: ['master'] },
        canActivate: [AuthGuard, RolesGuard],
        children: [
          {
            path: '',
            loadChildren: () =>
              import('./module/img-upload/img-upload.module').then(
                (m) => m.ImgUploadModule
              ),
          },
        ],
      },
      {
        path: 'verify-email',
        children: [
          {
            path: '',
            loadChildren: () =>
              import(
                './module/email-verification/email-verification.module'
              ).then((m) => m.EmailVerificationModule),
          },
        ],
      },
    ],
  },
  {
    path: '',
    component: LayoutComponent,
    data: { layout: 'user-layout' },
    canActivate: [NewAuthGuard],
    children: [
      {
        path: 'settings',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('./module/settings/settings.module').then(
                (m) => m.SettingsModule
              ),
          },
        ],
      },
    ],
  },
  {
    path: '',
    component: LayoutComponent,
    data: { layout: 'empty-layout' },
    canActivate: [NewAuthGuard],
    children: [
      {
        path: 'frame-management',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('./module/frame-management/frame-management.module').then(
                (m) => m.FrameManagementModule
              ),
          },
        ],
      },
    ],
  },
  {
    path: '',
    component: LayoutComponent,
    data: { layout: 'dashboard-layout' },
    canActivate: [AuthGuard],
    children: [
      {
        path: 'dashboard',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('./module/dashboard/dashboard.module').then(
                (m) => m.DashboardModule
              ),
          },
        ],
      },
      {
        path: 'images',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('./module/canvas-generator/canvas-generator.module').then(
                (m) => m.CanvasGeneratorModule
              ),
          },
        ],
      },
      {
        path: 'img',
        component: LayoutComponent,
        data: { layout: 'dashboard-layout', roles: ['admin'] },
        canActivate: [AuthGuard, RolesGuard],
        children: [
          {
            path: '',
            loadChildren: () =>
              import('./module/img/img.module').then((m) => m.ImgModule),
          },
        ],
      },
      {
        path: 'view',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('./module/view/view.module').then((m) => m.ViewModule),
            canActivate: [RolesGuard],
            data: { roles: ['master'] },
          },
        ],
      },
      {
        path: 'user-img',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('./module/user-img/user-img.module').then(
                (m) => m.UserImgModule
              ),
          },
        ],
      },
      {
        path: 'admin',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('./module/admin/admin.module').then((m) => m.AdminModule),
          },
        ],
      },
      {
        path: 'user-profile',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('./module/user-profile/user-profile.module').then(
                (m) => m.UserProfileModule
              ),
          },
        ],
      },
      {
        path: 'post-management',
        canActivate: [NewAuthGuard],
        children: [
          {
            path: '',
            loadChildren: () =>
              import('./module/post-management/post-management.module').then(
                (m) => m.PostManagementModule
              ),
          },
        ],
      }
    ],
  },
  {
    path: '**',
    redirectTo: 'latest',
    pathMatch: 'full',
  },
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      initialNavigation: 'enabledBlocking',
      urlUpdateStrategy: 'deferred',
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
