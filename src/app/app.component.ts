import { Component } from '@angular/core';
import { SEOService } from './common/services/seo.service';
import { NavigationEnd, NavigationError, NavigationStart, Router } from '@angular/router';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { LoaderService } from './common/services/loader';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  animations: [
    trigger('fadeInOut', [
      state('true', style({ opacity: 1, height: '100%' })),
      state('false', style({ opacity: 0, height: 0 })),
      transition('false => true', animate('0ms ease-in')),
      transition('true => false', animate('100ms ease-in-out'))
    ]),
  ]
})
export class AppComponent {
  constructor(private seoService: SEOService, public loaderService: LoaderService, private router: Router) {
  }
  ngOnInit(): void {
    this.seoService.initSEO();
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        this.loaderService.show(0);
      } else if (event instanceof NavigationEnd || event instanceof NavigationError) {
        this.loaderService.hide();
      }
    })
  }

}
