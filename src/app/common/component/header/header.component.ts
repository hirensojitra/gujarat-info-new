import { ViewEncapsulation, Component } from '@angular/core';
import { User } from '../../interfaces/commonInterfaces';
import { BreadcrumbService } from '../../services/breadcrumb';
import { ABSService } from '../../../../../projects/angular-bootstrap-sidebar/src/public-api';
import { UserService } from '../../services/user.service';
import { AuthService } from '../../services/auth.service';
import { environment } from '../../../../environments/environment';
import { Subscription } from 'rxjs';

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
  encapsulation: ViewEncapsulation.Emulated
})
export class HeaderComponent {
  menuStatus: any = false;
  userSubscription!: Subscription;
  // *****************************************************
  // ************ DON'T DELETE THIS COMMENT **************
  // *****************************************************
  // menu: MenuItem[] = [
  //   {
  //     label: 'Cloud Requisition',
  //     icon: 'fa-cloud',
  //     link: '/admin/cloud-requisition',
  //     subItems: [
  //       {
  //         label: 'Requisition Details',
  //         link: '/admin/cloud-requisition/cloud-requisition-data'
  //       },
  //       {
  //         label: 'Add Requisition Details',
  //         link: '/admin/cloud-requisition/cloud-requisition-form'
  //       }
  //     ]
  //   }, {
  //     label: 'Project Details',
  //     icon: 'fa-support',
  //     link: '/admin/project-details'
  //   }, {
  //     label: 'Support',
  //     icon: 'fa-support',
  //     link: '/admin/support',
  //     subItems: [{
  //       label: 'Request',
  //       link: '/admin/support/support-request',
  //     }]
  //   }, {
  //     label: 'User Management',
  //     icon: 'fa-user',
  //     link: '/admin/user-management',
  //     subItems: [{
  //       label: 'User Approval',
  //       link: '/admin/user-management/user-approval',
  //     }, {
  //       label: 'Application User',
  //       link: '/admin/user-management/application-user',
  //     }]
  //   }
  // ];
  menu: MenuItem[] = []
  originalMenu: MenuItem[] = [
    {
      label: 'Master Data',
      icon: 'fa-database',
      link: '/view',
      role: ['master'],
      subItems: [{
        label: 'Districts',
        link: '/view/district',
      }, {
        label: 'Talukas',
        link: '/view/taluka',
      }, {
        label: 'Villages',
        link: '/view/village',
      }]
    },
    {
      label: 'Dashboard',
      icon: 'fa-tachometer',
      link: '/dashboard',
      role: ['master'],
    }, {
      label: 'Admin',
      icon: 'fa-users',
      link: '/admin',
      role: ['master'],
      subItems: [{
        label: 'Users',
        link: '/admin/users'
      }]
    }, {
      label: 'User Profile',
      icon: 'fa-user',
      link: '/user-profile'
    }, {
      label: 'Images',
      icon: 'fa-image',
      link: '/img',
      role: ['admin'],
    }, {
      label: 'User Images',
      icon: 'fa-image',
      link: '/user-img'
    },
    {
      label: 'Canvas Generator',
      icon: 'fa-image',
      link: '/images',
      role: ['admin'],
      subItems: [{
        label: 'Image List',
        link: '/images/list'
      }, {
        label: 'Image Editor',
        link: '/images/generate'
      }, {
        label: 'Upload Images',
        link: '/images/uploaded-images'
      }, {
        label: 'Image Deleted',
        link: '/images/deleted'
      }]
    }
  ];
  user!: User;
  breadcrumbs: { label: string, link: string }[] = [];
  userFullName: string = "User Name";
  constructor(
    private breadcrumbService: BreadcrumbService,
    public ABSService: ABSService,
    private authService: AuthService,
    private US: UserService
  ) {
    this.breadcrumbService.breadcrumbs$.subscribe(breadcrumbs => {
      this.breadcrumbs = breadcrumbs;
    });
    if (this.menuStatus == true) {
      ABSService.toggleMenu();
      this.menuStatus = ABSService.getMenuStatus()
    }
  }
  toggleMenu() {
    this.ABSService.toggleMenu();
    this.menuStatus = this.ABSService.getMenuStatus();
  }
  logout(): void {
    this.authService.logout();
  }
  private apiUrl = environment.MasterApi + '/auth/profile-image/';
  imageUrl: string = '';
  validateImage(username: string) {
    const randomParam = `?v=${new Date().getTime()}&quality=10`; // Generate a random query parameter using timestamp
    const imageUrl = username
      ? `${this.apiUrl + username}${randomParam}` // Append randomParam if username exists
      : `https://dummyimage.com/300x300/F4F4F4/000000&text=${this.imageText()}`; // Return default image URL
    this.imageUrl = imageUrl;
  }
  imageText(): string {
    if (this.user && this.user['firstname'] && this.user['lastname']) {
      const firstCharFirstName = this.user['firstname'].charAt(0);
      const firstCharLastName = this.user['lastname'].charAt(0);
      return `${firstCharFirstName}${firstCharLastName}`;
    } else {
      return 'USER';
    }
  }
  ngOnInit(): void {
    this.userSubscription = this.US.getUser().subscribe((user: User | null) => {
      if (user) {
        this.user = user;
        this.validateImage(this.user.username);
        this.filterMenuByRole();
        this.userFullName = this.US.getFullName()
      }
    });
  }
  isAdmin(): boolean {
    return this.authService.hasRole(['admin'])
  }
  isMaster(): boolean {
    return this.authService.hasRole(['master'])
  }
  isUser(): boolean {
    return this.authService.hasRole(['user'])
  }
  // Filter the menu based on the user's role
  filterMenuByRole(): void {
    if (this.user && this.user.roles) {
      this.menu = this.originalMenu.filter(menuItem => {
        if (menuItem.role && menuItem.role.length > 0) {
          if (menuItem.role.includes('admin') && this.isAdmin()) {
            return true;
          }
          if (menuItem.role.includes('master') && this.isMaster()) {
            return true;
          }
          if (menuItem.role.includes('user') && this.isUser()) {
            return true;
          }
          return false;
        }
        return true;
      });
    }
  }

}
