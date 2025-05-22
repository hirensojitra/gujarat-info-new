import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription, Observable, of } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { BreadcrumbService } from '../../services/breadcrumb';
import { ABSService } from 'projects/angular-bootstrap-sidebar/src/public-api';
import { AuthenticationService } from '../../services/authentication.service';
import { RoleService } from '../../services/role.service';
import { Role } from 'src/app/graphql/types/role.types';
import { UserPublicInfo } from 'src/app/graphql/types/login.types';

export interface MenuItem {
  label: string;
  icon?: string;
  link?: string;
  title?: string;
  subItems?: MenuItem[];
  role?: string[];
}

@Component({
  selector: 'admin-header',
  templateUrl: './admin-header.component.html',
  styleUrls: ['./admin-header.component.scss'],
})
export class AdminHeaderComponent implements OnInit, OnDestroy {
  // Observable menu toggle state
  menuStatus$: Observable<boolean>;

  breadcrumbs: { label: string; link: string }[] = [];
  imageUrl = '';
  userFullName = 'User Name';
  user: UserPublicInfo | null = null;

  filteredMenu$: Observable<MenuItem[]> = of([]);
  private subscriptions = new Subscription();
  private apiUrl = environment.MasterApi + '/auth/profile-image/';

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
      subItems: [
        {
          label: 'Image List',
          link: '/images/list',
        },
        {
          label: 'Image Editor',
          link: '/images/generate',
          role: ['administrator'],
        },
        {
          label: 'Image Deleted',
          link: '/images/deleted',
          role: ['administrator'],
        },
      ],
    },
    {
      label: 'Settings',
      icon: 'fa-gears',
      role: ['administrator'],
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

  constructor(
    private breadcrumbService: BreadcrumbService,
    public ABSService: ABSService,
    private authService: AuthenticationService,
    private roleService: RoleService
  ) {
    this.menuStatus$ = this.ABSService.getMenuStatus();
  }

  ngOnInit(): void {
    // Breadcrumbs
    this.subscriptions.add(
      this.breadcrumbService.breadcrumbs$.subscribe(
        (b) => (this.breadcrumbs = b)
      )
    );

    // Track current user for display
    this.subscriptions.add(
      this.authService.user$.subscribe((u) => {
        this.user = u;
        this.userFullName = u ? `${u.firstname} ${u.lastname}` : 'User Name';
      })
    );

    // Build filtered menu based on user role
    this.filteredMenu$ = this.authService.user$.pipe(
      switchMap((u) => {
        if (!u || !u.id) {
          this.imageUrl = this.defaultImage();
          return of([] as MenuItem[]);
        }
        this.imageUrl = this.buildImageUrl(u.image || '');
        return this.roleService.getRoleById(u.role_id).pipe(
          map((roleInfo: Role | null) => {
            const roleCode = roleInfo?.code || '';
            return this.filterMenuByRole(roleCode);
          })
        );
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  toggleMenu(): void {
    this.ABSService.toggleMenu();
  }

  logout(): void {
    this.authService.logout();
  }

  private buildImageUrl(url: string): string {
    if (url) {
      return `${url}?v=${Date.now()}`;
    }
    return this.defaultImage();
  }

  private defaultImage(): string {
    const initials = this.initialsFromUser();
    return `https://dummyimage.com/300x300/F4F4F4/000000&text=${initials}`;
  }

  private initialsFromUser(): string {
    if (this.user?.firstname && this.user.lastname) {
      return this.user.firstname.charAt(0) + this.user.lastname.charAt(0);
    }
    return 'USER';
  }

  private filterMenuByRole(userRole: string): MenuItem[] {
    const normalized = userRole.trim().toLowerCase();

    function filterItem(item: MenuItem): MenuItem | null {
      const roles = item.role?.map((r) => r.toLowerCase()) ?? [];

      const hasAccess =
        roles.length === 0
          ? // unrestricted parent
            true
          : // restricted parent: exact match required
            roles.includes(normalized);

      // if this parent is restricted and user lacks access → drop entirely
      if (roles.length > 0 && !hasAccess) {
        return null;
      }

      // otherwise (public parent, or restricted-but-accessible parent), filter children
      const subs =
        item.subItems
          ?.map(filterItem)
          .filter((c): c is MenuItem => c !== null) ?? [];

      // return the item, attaching filtered children only if any
      return {
        ...item,
        subItems: subs.length ? subs : undefined,
      };
    }

    return this.originalMenu
      .map(filterItem)
      .filter((i): i is MenuItem => i !== null);
  }
}
