import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Title } from '@angular/platform-browser';
import { Meta } from '@angular/platform-browser';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { filter, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class SEOService {
  constructor(
    private titleService: Title,
    private metaService: Meta,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    @Inject(PLATFORM_ID) private platformId: Object
  ) { }

  initSEO() {
    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        map(() => {
          let route = this.activatedRoute;
          while (route.firstChild) {
            route = route.firstChild;
          }
          return route.snapshot.data;
        })
      )
      .subscribe((data) => {
        if (isPlatformBrowser(this.platformId)) {
          this.updateTitle(data['title']);
          this.updateMetaTags(data);
        } else {
          // If server-side, you can set up your meta tags here.
          this.updateTitle(data['title']);
          this.updateMetaTags(data);
        }
      });
  }

  updateTitle(title: string) {
    if (title) {
      this.titleService.setTitle(title);
    }
  }

  updateMetaTags(data: any) {
    if (data['description']) {
      this.metaService.updateTag({ name: 'description', content: data['description'] });
    }
    if (data['keywords']) {
      this.metaService.updateTag({ name: 'keywords', content: data['keywords'] });
    }
    if (data['robots']) {
      this.metaService.updateTag({ name: 'robots', content: data['robots'] });
    }
    if (data['image']) {
      this.metaService.updateTag({ property: 'og:image', content: data['image'] });
      this.metaService.updateTag({ property: 'twitter:image', content: data['image'] });
    }
  }
}
