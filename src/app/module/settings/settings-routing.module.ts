import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SettingsComponent } from './settings.component';
import { HelpSupportModule } from './help-support/help-support.module';

const routes: Routes = [
  {
    path: '',
    component: SettingsComponent,
    data: {
      title: 'Privacy Policy | PostNew',
      description:
        'Learn about how PostNew collects, uses, and protects your data in compliance with privacy laws and best practices.',
      keywords:
        'Privacy Policy, PostNew, user data, data protection, GDPR, data usage',
      robots: 'index, follow',
    },
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'account' },
      {
        path: 'account',
        loadChildren: () =>
          import('./account/account.module').then((m) => m.AccountModule),
      },
      {
        path: 'billing',
        loadChildren: () =>
          import('./billing/billing.module').then((m) => m.BillingModule),
      },
      {
        path: 'logout',
        loadChildren: () =>
          import('./logout/logout.module').then((m) => m.LogoutModule),
      },
      {
        path: 'notifications',
        loadChildren: () =>
          import('./notifications/notifications.module').then(
            (m) => m.NotificationsModule
          ),
      },
      {
        path: 'privacy',
        loadChildren: () =>
          import('./privacy/privacy.module').then((m) => m.PrivacyModule),
      },
      {
        path: 'profile',
        loadChildren: () =>
          import('./profile/profile.module').then((m) => m.ProfileModule),
      },
      {
        path: 'security',
        loadChildren: () =>
          import('./security/security.module').then((m) => m.SecurityModule),
      },
      {
        path: 'help-support',
        loadChildren: () =>
          import('./help-support/help-support.module').then((m) => m.HelpSupportModule),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SettingsRoutingModule {}
