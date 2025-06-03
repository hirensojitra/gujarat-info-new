// user-layout.component.ts

import {
  Component,
  OnInit,
  OnDestroy,
  AfterViewInit,
  ChangeDetectorRef,
} from '@angular/core';
import { Observable, of, Subscription } from 'rxjs';
import { map, switchMap, take } from 'rxjs/operators';
import { MenuItem } from 'src/app/common/component/admin-header/admin-header.component';
import { AuthenticationService } from 'src/app/common/services/authentication.service';
import { LoaderService } from 'src/app/common/services/loader';
import { RoleService } from 'src/app/common/services/role.service';
import { UserPublicInfo } from 'src/app/graphql/types/login.types';

@Component({
  selector: 'app-user-layout',
  templateUrl: './user-layout.component.html',
  styleUrl: './user-layout.component.scss',
})
export class UserLayoutComponent implements OnInit, OnDestroy, AfterViewInit {
  filteredMenu$!: Observable<MenuItem[]>;
  menuLoaded = false;
  private sub = new Subscription();
  constructor(
    private authService: AuthenticationService,
    private roleService: RoleService,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.filteredMenu$ = this.authService.user$.pipe(
      switchMap((u) =>
        u
          ? this.roleService
              .getRoleById(u.role_id)
              .pipe(map((r) => this.filterMenuByRole(r.code.toLowerCase())))
          : of([] as MenuItem[])
      )
    );
  }
  ngAfterViewInit(): void {
    this.sub.add(
      this.filteredMenu$.pipe(take(1)).subscribe(() => {
        this.menuLoaded = true;
        // force Angular to run another change-detection pass
        this.cd.detectChanges();
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
          label: 'Post Generate',
          link: '/images/post-generate',
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
      label: 'Post Management',
      icon: 'fa-file',
      link: '/post-management',
      role: ['administrator', 'owner'],
      subItems: [
        {
          label: 'Post Category',
          link: '/post-management/post-category',
          role: ['administrator', 'owner'],
          icon: 'fa-folder',
        },
        {
          label: 'Post Subcategory',
          link: '/post-management/post-subcategory',
          role: ['administrator', 'owner'],
          icon: 'fa-folder-open',
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
