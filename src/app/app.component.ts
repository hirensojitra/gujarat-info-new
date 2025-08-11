import {
  Component,
  AfterViewInit,
  ChangeDetectorRef,
  OnInit,
  OnDestroy,
  HostListener
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
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

const SESSION_TIMEOUT_MINUTES = 15; // 15 minutes

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
export class AppComponent implements OnInit, AfterViewInit, OnDestroy {
  private destroy$ = new Subject<void>();
  private lastActivity: number = Date.now();
  private activityInterval: any;

  @HostListener('document:mousemove')
  @HostListener('document:keydown')
  @HostListener('document:click')
  onActivity() {
    this.resetActivity();
  }

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
    if (this.authService.isLoggedIn()) {
      this.sessionService.startSessionSync();
      this.startInactivityTimer();
    }
  }

  ngAfterViewInit(): void {
    this.router.events.pipe(takeUntil(this.destroy$)).subscribe((event) => {
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

  private resetActivity(): void {
    this.lastActivity = Date.now();
  }

  private checkInactivity(): void {
    const now = Date.now();
    const elapsedMinutes = (now - this.lastActivity) / (1000 * 60);

    if (elapsedMinutes >= SESSION_TIMEOUT_MINUTES) {
      this.authService.logout();
      clearInterval(this.activityInterval);
    }
  }

  private startInactivityTimer(): void {
    this.resetActivity();
    this.activityInterval = setInterval(() => {
      this.checkInactivity();
    }, 5000); // Check every 5 seconds
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    if (this.activityInterval) {
      clearInterval(this.activityInterval);
    }
  }
}