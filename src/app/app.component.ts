// app.component.ts
import {
  Component,
  AfterViewInit,
  ChangeDetectorRef,
  OnInit,
} from '@angular/core';
import { SEOService } from './common/services/seo.service';
import { LoaderService } from './common/services/loader';
import {
  NavigationEnd,
  NavigationError,
  NavigationStart,
  Router,
} from '@angular/router';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { SessionService } from './common/services/session.service';
import { AuthenticationService } from './common/services/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    trigger('fadeInOut', [
      state('true', style({ opacity: 1, height: '100%' })),
      state('false', style({ opacity: 0, height: 0 })),
      transition('false => true', animate('0ms ease-in')),
      transition('true => false', animate('100ms ease-in-out')),
    ]),
  ],
})
export class AppComponent implements OnInit, AfterViewInit {
  constructor(
    private seoService: SEOService,
    public loaderService: LoaderService,
    private router: Router,
    private cdr: ChangeDetectorRef,
    private sessionService: SessionService,
    private authService: AuthenticationService
  ) {}

  ngOnInit(): void {
    this.seoService.initSEO();
    this.authService.isLoggedIn() && this.sessionService.startSessionSync();
  }

  ngAfterViewInit(): void {
  this.router.events.subscribe((event) => {
    if (event instanceof NavigationStart) {
      const url = event.url;
      const isFileManagerSubRoute = url.startsWith('/file-manager/folders/') || url.startsWith('/file-manager/details/');

      if (!isFileManagerSubRoute) {
        this.loaderService.show(0);
      }
    } else if (
      event instanceof NavigationEnd ||
      event instanceof NavigationError
    ) {
      let url: string | undefined;
      if (event instanceof NavigationEnd) {
        url = event.urlAfterRedirects;
      } else if (event instanceof NavigationError) {
        url = (event as any).url;
      }
      const isFileManagerSubRoute = url?.startsWith('/file-manager/folders/') || url?.startsWith('/file-manager/details/');

      if (!isFileManagerSubRoute) {
        this.loaderService.hide();
      }
    }
    this.cdr.detectChanges();
  });
}

}
