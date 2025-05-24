// user-layout.component.ts

import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { map, switchMap, take } from 'rxjs/operators';
import { MenuItem } from 'src/app/common/component/admin-header/admin-header.component';
import { AuthenticationService } from 'src/app/common/services/authentication.service';
import { RoleService } from 'src/app/common/services/role.service';
import { UserPublicInfo } from 'src/app/graphql/types/login.types';

@Component({
  selector: 'app-user-layout',
  templateUrl: './user-layout.component.html',
  styleUrl: './user-layout.component.scss',
})
export class UserLayoutComponent implements OnInit, OnDestroy {
  filteredMenu$!: Observable<MenuItem[]>;
  menuLoaded = false;
  private sub = new Subscription();
  constructor(
    private authService: AuthenticationService,
    private roleService: RoleService
  ) {}

  ngOnInit() {
    this.filteredMenu$ = this.authService.user$.pipe(
      switchMap((u: UserPublicInfo | null) => {
        if (!u) {
          return [[] as MenuItem[]]; // no user → empty menu
        }
        return this.roleService.getRoleById(u.role_id).pipe(
          map((roleInfo) => {
            const code = roleInfo?.code?.toLowerCase() || '';
            return this.filterMenuByRole(code);
          })
        );
      })
    );
    this.sub.add(
      this.filteredMenu$.pipe(take(1)).subscribe(() => {
        this.menuLoaded = true;
      })
    );
  }
  private originalMenu: MenuItem[] = [
    {
      label: 'Master Data',
      icon: 'fa-database',
      link: '/view',
      role: ['owner'],
      subItems: [
        {
          label: 'Districts New',
          link: '/view/district-new',
        },
        {
          label: 'Taluka New',
          link: '/view/taluka-new',
        },
        {
          label: 'Village New',
          link: '/view/village-new',
        },
      ],
    },
    {
      label: 'Dashboard',
      icon: 'fa-tachometer',
      link: '/dashboard',
      role: ['owner'],
    },
    {
      label: 'SVG',
      icon: 'fa-users',
      link: '/img-upload',
      role: ['master'],
    },
    {
      label: 'Admin',
      icon: 'fa-users',
      link: '/admin',
      role: ['administrator'],
      subItems: [
        {
          label: 'Users',
          link: '/admin/users',
        },
      ],
    },
    {
      label: 'User Profile',
      icon: 'fa-user',
      link: '/user-profile',
    },
    {
      label: 'Images',
      icon: 'fa-image',
      link: '/img',
      role: ['admin'],
    },
    {
      label: 'User Images',
      icon: 'fa-image',
      link: '/user-img',
      role: ['master'],
    },
    {
      label: 'Canvas Generator',
      icon: 'fa-image',
      link: '/images',
      subItems: [
        {
          label: 'Image List',
          link: '/images/list',
        },
        {
          label: 'Image Editor',
          link: '/images/generate',
          role: ['owner', 'administrator'],
        },
        {
          label: 'Image Deleted',
          link: '/images/deleted',
          role: ['owner', 'administrator'],
        },
      ],
    },
    {
      label: 'Frame Managment',
      icon: 'fa-square',
      link: '/frame-management',
      role: ['administrator'],
    },
    {
      label: 'Settings',
      icon: 'fa-gears',
      link: '/settings',
      role: ['administrator', 'viewer'],
      subItems: [
        { label: 'Public profile', link: 'settings/profile' },
        { label: 'Image Manager', link: 'settings/image-manager' },
        { label: 'Account settings', link: 'settings/account' },
        { label: 'Notifications', link: 'settings/notifications' },
        { label: 'Privacy settings', link: 'settings/privacy' },
        { label: 'Security settings', link: 'settings/security' },
        { label: 'Billing', link: 'settings/billing' },
        { label: 'Help & Support', link: 'settings/help-support' },
        { label: 'Logout', link: 'settings/logout' },
        ,
      ],
    },
  ];

  private filterMenuByRole(userRole: string): MenuItem[] {
    const normalized = userRole.trim().toLowerCase();
    const filterItem = (item: MenuItem): MenuItem | null => {
      const roles = (item.role ?? []).map((r) => r.toLowerCase());
      const hasAccess = roles.length === 0 || roles.includes(normalized);
      if (!hasAccess) return null;

      const subs = (item.subItems ?? [])
        .map(filterItem)
        .filter((x): x is MenuItem => x !== null);

      return { ...item, subItems: subs.length ? subs : undefined };
    };

    return this.originalMenu
      .map(filterItem)
      .filter((i): i is MenuItem => i !== null);
  }
  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
