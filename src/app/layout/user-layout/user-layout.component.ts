import { Component } from '@angular/core';
interface NavItem {
  label: string;
  path: string;
}
@Component({
  selector: 'app-user-layout',
  templateUrl: './user-layout.component.html',
  styleUrl: './user-layout.component.scss',
})
export class UserLayoutComponent {
  navItems: NavItem[] = [
    { label: 'Public profile', path: 'settings/profile' },
    { label: 'Account settings', path: 'settings/account' },
    { label: 'Notifications', path: 'settings/notifications' },
    { label: 'Privacy settings', path: 'settings/privacy' },
    { label: 'Security settings', path: 'settings/security' },
    { label: 'Billing', path: 'settings/billing' },
    { label: 'Help & Support', path: 'settings/help-support' },
    { label: 'Logout', path: 'settings/logout' },
  ];
}
