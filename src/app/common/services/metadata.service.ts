import { Injectable, OnDestroy } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter, map, mergeMap, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Injectable({
    providedIn: 'root'
  })
  export class MetadataService implements OnDestroy {
    private destroy$ = new Subject<void>();
    constructor(private meta: Meta, private router: Router, private route: ActivatedRoute, private titleService: Title) {}
  
    setMetadata(): void {
      this.router.events.pipe(
        filter(event => event instanceof NavigationEnd),
        map(() => this.route),
        map(route => {
          while (route.firstChild) {
            route = route.firstChild;
          }
          return route;
        }),
        mergeMap(route => route.data),
        takeUntil(this.destroy$)
      ).subscribe(data => {
        this.meta.updateTag({ name: 'description', content: (data as any).description });
        this.meta.updateTag({ property: 'og:title', content: (data as any).title });
        this.titleService.setTitle((data as any).title);
      });
    }
    ngOnDestroy(): void {
      this.destroy$.next();
      this.destroy$.complete();
    }
  }
  