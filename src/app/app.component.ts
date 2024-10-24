import { Component, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { SEOService } from './common/services/seo.service';
import { NavigationEnd, NavigationError, NavigationStart, Router } from '@angular/router';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { LoaderService } from './common/services/loader';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'], // Fixed typo: styleUrl -> styleUrls
  animations: [
    trigger('fadeInOut', [
      state('true', style({ opacity: 1, height: '100%' })),
      state('false', style({ opacity: 0, height: 0 })),
      transition('false => true', animate('0ms ease-in')),
      transition('true => false', animate('100ms ease-in-out'))
    ]),
  ]
})
export class AppComponent implements AfterViewInit { // Implementing AfterViewInit for better async handling
  constructor(
    private seoService: SEOService,
    public loaderService: LoaderService,
    private router: Router,
    private cdr: ChangeDetectorRef  // Inject ChangeDetectorRef to handle manual change detection
  ) { }

  ngOnInit(): void {
    this.seoService.initSEO(); // Keep SEO initialization in ngOnInit
  }

  ngAfterViewInit(): void {
    // Move router events subscription to ngAfterViewInit to ensure view is initialized
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        this.loaderService.show(0);
      } else if (event instanceof NavigationEnd || event instanceof NavigationError) {
        this.loaderService.hide();
      }
      this.cdr.detectChanges();
    });
  }
}
