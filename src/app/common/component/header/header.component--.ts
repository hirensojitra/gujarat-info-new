import { Component, ViewEncapsulation } from '@angular/core';
import { Observable, of, Subscription, switchMap } from 'rxjs';
import { BreadcrumbService } from '../../services/breadcrumb';
import { ABSService } from '../../../../../projects/angular-bootstrap-sidebar/src/public-api';
import { UserService } from '../../services/user.service';
import { AuthenticationService } from '../../services/authentication.service';
import { environment } from '../../../../environments/environment';
import { LoginService } from '../../services/login.service';
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
  selector: 'main-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
})
export class HeaderComponent {
  menuStatus: any = false;
  originalMenu: MenuItem[] = [
    {
      label: 'Master Data',
      icon: 'fa-database',
      link: '/view',
      role: ['ADMINISTRATOR'],
      subItems: [
        { label: 'Districts New', link: '/view/district-new' },
        { label: 'Taluka New', link: '/view/taluka-new' },
        { label: 'Village New', link: '/view/village-new' },
        { label: 'Districts', link: '/view/district' },
        { label: 'Talukas', link: '/view/taluka/1' },
        { label: 'Villages', link: '/view/village/1/1' },
      ],
    },
    { label: 'Dashboard', icon: 'fa-tachometer', link: '/dashboard' },
    { label: 'SVG', icon: 'fa-users', link: '/img-upload', role: ['ADMINISTRATOR'] },
    {
      label: 'Admin',
      icon: 'fa-users',
      link: '/admin',
      role: ['ADMINISTRATOR'],
      subItems: [{ label: 'Users', link: '/admin/users' }],
    },
    { label: 'User Profile', icon: 'fa-user', link: '/user-profile' },
    { label: 'Images', icon: 'fa-image', link: '/img', role: ['ADMINISTRATOR'] },
    {
      label: 'User Images',
      icon: 'fa-image',
      link: '/user-img',
      role: ['ADMINISTRATOR'],
    },
    {
      label: 'Canvas Generator',
      icon: 'fa-image',
      link: '/images',
      subItems: [
        { label: 'Image List', link: '/images/list' },
        { label: 'Image Editor', link: '/images/generate', role: ['ADMINISTRATOR'] },
        { label: 'Image Deleted', link: '/images/deleted', role: ['ADMINISTRATOR'] },
      ],
    },
  ];
  filteredMenu$: Observable<MenuItem[]> = of([]);
  user!: UserPublicInfo;
  userFullName = 'User Name';
  imageUrl = '';
  private apiUrl = environment.MasterApi + '/auth/profile-image/';
  private userSubscription!: Subscription;

  constructor(
    private breadcrumbService: BreadcrumbService,
    public ABSService: ABSService,
    private authService: AuthenticationService,
    private userService: UserService,
    private loginService: LoginService
  ) {
    this.breadcrumbService.breadcrumbs$.subscribe(
      (breadcrumbs) => (this.breadcrumbs = breadcrumbs)
    );
    if (this.menuStatus === true) {
      this.ABSService.toggleMenu();
      this.menuStatus = this.ABSService.getMenuStatus();
    }
  }

  async ngOnInit(): Promise<void> {
    this.userSubscription = this.authService.user$
      .pipe(
        switchMap((user) => {
          if (!user) return of(null);
          this.user = user;
          this.validateImage(user.username);
          this.userFullName = `${user.firstname} ${user.lastname}`;
          return this.filterMenuItemsByServerRoles(user.id);
        })
      )
      .subscribe((filtered) => {
        this.filteredMenu$ = of(filtered || []);
      });
  }

  toggleMenu() {
    this.ABSService.toggleMenu();
    this.menuStatus = this.ABSService.getMenuStatus();
  }

  logout(): void {
    this.authService.logout();
  }

  validateImage(username: string) {
    const randomParam = `?v=${new Date().getTime()}&quality=10`;
    this.imageUrl = username
      ? `${this.apiUrl + username}${randomParam}`
      : `https://dummyimage.com/300x300/F4F4F4/000000&text=${this.imageText()}`;
  }

  imageText(): string {
    return (
      this.user?.firstname?.[0]?.toUpperCase() +
        this.user?.lastname?.[0]?.toUpperCase() || 'USER'
    );
  }

  private async filterMenuItemsByServerRoles(
    user_id: string
  ): Promise<MenuItem[]> {
    const checkRole = async (role?: string): Promise<boolean> => {
      if (!role) return true;
      try {
        const res = await this.loginService
          .checkUserHasRole(user_id, role)
          .toPromise();
        return res?.data?.hasRole ?? false;
      } catch {
        return false;
      }
    };

    const recursiveFilter = async (items: MenuItem[]): Promise<MenuItem[]> => {
      const results: MenuItem[] = [];

      for (const item of items) {
        const isAllowed =
          !item.role ||
          (await Promise.all(item.role.map(checkRole))).some((v) => v);
        if (!isAllowed) continue;

        let subItems: MenuItem[] | undefined;
        if (item.subItems) {
          subItems = await recursiveFilter(item.subItems);
        }

        results.push({
          ...item,
          subItems: subItems?.length ? subItems : undefined,
        });
      }
      return results;
    };

    return await recursiveFilter(this.originalMenu);
  }

  breadcrumbs: { label: string; link: string }[] = [];
}
