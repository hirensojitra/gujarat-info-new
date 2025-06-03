import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Subscription, Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { BreadcrumbService } from '../../services/breadcrumb';
import { ABSService } from 'projects/angular-bootstrap-sidebar/src/public-api';
import { AuthenticationService } from '../../services/authentication.service';
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
  @Input() menuData: MenuItem[] = [];
  @Input() menuHover = true;
  @Input() toggleOutside = true;
  @Input() logo = 'assets/images/svg/logo-large.svg';
  @Input() compactLogo = 'assets/images/svg/logo.svg';
  menuStatus$: Observable<boolean>;

  breadcrumbs: { label: string; link: string }[] = [];
  imageUrl = '';
  userFullName = 'User Name';
  user: UserPublicInfo | null = null;

  private subscriptions = new Subscription();
  private apiUrl = environment.MasterApi + '/auth/profile-image/';
  constructor(
    private breadcrumbService: BreadcrumbService,
    public ABSService: ABSService,
    private authService: AuthenticationService
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
        console.log('Current User:', u);
        this.user = u;
        this.userFullName = u ? `${u.firstname} ${u.lastname}` : 'User Name';
        this.imageUrl = u.image
          ? u.image+'?thumb=true'
          : u.firstname && u.lastname
          ? `https://dummyimage.com/300x300/F4F4F4/000000&text=${
              this.userFullName || 'USER'
            }`
          : this.compactLogo;
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
}
