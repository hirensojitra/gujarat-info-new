import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import { Router, NavigationEnd } from '@angular/router';
import { takeUntil } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BreadcrumbService implements OnDestroy {
  private breadcrumbsSubject = new BehaviorSubject<{ label: string, link: string }[]>([]);
  breadcrumbs$: Observable<{ label: string, link: string }[]> = this.breadcrumbsSubject.asObservable();
  private destroy$ = new Subject<void>();

  constructor(private activatedRoute: ActivatedRoute, private router: Router) {
    this.router.events.pipe(takeUntil(this.destroy$)).subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.createBreadcrumbs(activatedRoute.snapshot.root);
      }
    });
    this.createBreadcrumbs(activatedRoute.snapshot.root);
  }

  private formatPath(path: string): string {
    let updatedPath = path.replace(/^\/+|\/+$/g, '');
    updatedPath = updatedPath.replace(/\/+/g, '/');
    return '/' + updatedPath;
  }

  private createBreadcrumbs(routeSnapshot: ActivatedRouteSnapshot, url: string = '', breadcrumbs: { label: string, link: string }[] = []): { label: string, link: string }[] {
    const label = routeSnapshot.data['breadcrumb'];
    const nextUrl = url + `/${routeSnapshot.url.map(segment => segment.path).join('')}`;
    if (label) {
      breadcrumbs.push({ label: label, link: this.formatPath(nextUrl) });
    }
    if (routeSnapshot.firstChild) {
      return this.createBreadcrumbs(routeSnapshot.firstChild, nextUrl, breadcrumbs);
    }
    this.breadcrumbsSubject.next(breadcrumbs); // Update the breadcrumbs subject with the created breadcrumbs
    return breadcrumbs; // Add a return statement with void or undefined
  }
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
