import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Subscription, Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { BreadcrumbService } from '../../services/breadcrumb';
import { ABSService } from 'projects/angular-bootstrap-sidebar/src/public-api';
import { AuthenticationService } from '../../services/authentication.service';
import { UserPublicInfo } from 'src/app/graphql/types/login.types';
import { RoleService } from '../../services/role.service';
import { map, switchMap } from 'rxjs/operators';

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
  @Input() menuHover = true;
  @Input() toggleOutside = true;
  @Input() logo = 'assets/images/svg/logo-large.svg';
  @Input() compactLogo = 'assets/images/svg/logo.svg';
  menuStatus$: Observable<boolean>;

  breadcrumbs: { label: string; link: string }[] = [];
  imageUrl = '';
  userFullName = 'User Name';
  user: UserPublicInfo | null = null;
  public roles: string[] = []; // Declared as public

  private subscriptions = new Subscription();
  private apiUrl = environment.MasterApi + '/authentication/profile-image/';

  originalMenu: MenuItem[] = [
    {
      label: 'Master Data',
      icon: 'fa-database',
      link: '/view',
      role: ['OWNER', 'ADMINISTRATOR'],
      subItems: [
        {
          label: 'Districts New',
          link: '/view/district',
        },
        {
          label: 'Taluka New',
          link: '/view/taluka',
        },
        {
          label: 'Village New',
          link: '/view/village',
        },
      ],
    },
    {
      label: 'Dashboard',
      icon: 'fa-tachometer',
      link: '/dashboard',
    },
    {
      label: 'SVG',
      icon: 'fa-users',
      link: '/img-upload',
      role: ['OWNER'],
    }, 
    {
      label: 'Images',
      icon: 'fa-image',
      link: '/img',
      role: ['ADMINISTRATOR'],
    },
    {
      label: 'User Images',
      icon: 'fa-image',
      link: '/user-img',
      role: ['OWNER'],
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
        // {
        //   label: 'Image Editor',
        //   link: '/images/generate',
        //   role: ['ADMINISTRATOR', 'OWNER'],
        // },
        {
          label: 'Post Generate',
          link: '/images/post-generate',
          role: ['OWNER', 'ADMINISTRATOR'],
        },
        {
          label: 'Image Deleted',
          link: '/images/deleted',
          role: ['ADMINISTRATOR', 'OWNER'],
        },
      ],
    },
    {
      label: 'Post Management',
      icon: 'fa-file',
      link: '/post-management',
      role: ['ADMINISTRATOR', 'OWNER'],
      subItems: [
        {
          label: 'Post Category',
          link: '/post-management/post-category',
          role: ['ADMINISTRATOR', 'OWNER'],
          icon: 'fa-folder',
        },
        {
          label: 'Post Subcategory',
          link: '/post-management/post-subcategory',
          role: ['ADMINISTRATOR', 'OWNER'],
          icon: 'fa-folder-open',
        },
      ],
    },
    {
      label: 'Frame Management',
      icon: 'fa-square',
      link: '/frame-management',
      role: ['ADMINISTRATOR'],
    },
    {
      label: 'Settings',
      icon: 'fa-gears',
      link: '/settings',
      role: ['ADMINISTRATOR', 'VIEWER', 'OWNER'],
      subItems: [
        { label: 'Public Profile', link: 'settings/profile' },
        { label: 'Image Manager', link: 'settings/image-manager' },
        { label: 'Account Settings', link: 'settings/account' },
        { label: 'Notifications', link: 'settings/notifications' },
        { label: 'Privacy Settings', link: 'settings/privacy' },
        { label: 'Change Password', link: 'settings/change-password' },
        { label: 'Billing', link: 'settings/billing' },
        { label: 'Help & Support', link: 'settings/help-support' },
        { label: 'Logout', link: 'settings/logout' },
      ],
    },
  ];
  filteredMenu$: Observable<MenuItem[]>;

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
      this.authService.user$
        .pipe(
          switchMap((u) => {
            if (!u) {
              return of({ user: null, roles: [] });
            }
            return this.roleService.getRoles().pipe(
              map((roles) => {
                const userRole = roles.find((r) => r.id === u.role_id);
                return { user: u, roles: userRole ? [userRole.code] : [] };
              })
            );
          })
        )
        .subscribe(({ user, roles }) => {
          console.log('User:', user, 'Roles:', roles);
          this.user = user;
          this.roles = roles; // Correctly assign to the public property
          this.userFullName = user
            ? `${user.firstname} ${user.lastname}`
            : 'User Name';
          this.imageUrl = user.image
            ? user.image + '?thumb=true'
            : user.firstname && user.lastname
            ? `https://dummyimage.com/300x300/F4F4F4/000000&text=${
                this.userFullName || 'USER'
              }`
            : this.compactLogo;
          this.filteredMenu$ = of(this.filterMenuItemsByRole(roles));
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

  private filterMenuItemsByRole(userRoles: string[]): MenuItem[] {
    return this.originalMenu
      .map((menuItem) => this.filterMenuItem(menuItem, userRoles))
      .filter((item) => item !== null) as MenuItem[];
  }

  private filterMenuItem(
    menuItem: MenuItem,
    userRoles: string[]
  ): MenuItem | null {
    const hasAccessToMenuItem = this.hasAccess(menuItem.role, userRoles);
    if (hasAccessToMenuItem) {
      const filteredSubItems = menuItem.subItems
        ? (menuItem.subItems
            .map((subItem) => this.filterMenuItem(subItem, userRoles))
            .filter((item) => item !== null) as MenuItem[])
        : [];
      if (hasAccessToMenuItem || filteredSubItems.length > 0) {
        return {
          ...menuItem,
          subItems: filteredSubItems.length > 0 ? filteredSubItems : undefined,
        };
      }
    }
    return null;
  }

  private hasAccess(requiredRoles?: string[], userRoles?: string[]): boolean {
    if (!requiredRoles || requiredRoles.length === 0) {
      return true;
    }
    return requiredRoles.some((role) => userRoles.includes(role));
  }
}
