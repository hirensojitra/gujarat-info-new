// src/app/images/image-list/image-list.component.ts

import {
  Component,
  OnInit,
  AfterViewInit,
  OnDestroy,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  ElementRef,
  Inject,
  PLATFORM_ID,
  ViewChild,
  Renderer2,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import {
  ActivatedRoute,
  Router,
  UrlTree,
  NavigationExtras,
} from '@angular/router';
import { Observable, Subject } from 'rxjs';
import {
  map,
  switchMap,
  tap,
  takeUntil,
  shareReplay,
  startWith,
  withLatestFrom,
} from 'rxjs/operators';

import { AuthenticationService } from 'src/app/common/services/authentication.service';
import { RoleService } from 'src/app/common/services/role.service';
import { NewPostDetailService } from 'src/app/common/services/new-post-detail.service';
import {
  MinimalPostListResponse,
  Pagination,
  PostDetails,
} from 'src/app/graphql/types/post-detail.types';
import { environment } from 'src/environments/environment';

declare const Masonry: any;

@Component({
  selector: 'app-image-list',
  templateUrl: './image-list.component.html',
  styleUrls: ['./image-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ImageListComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('masonryGrid', { static: true }) masonryGridRef!: ElementRef;

  public isBrowser: boolean;
  public search = '';
  public sortBy: 'created_at' | 'title' = 'created_at';
  public order: 'asc' | 'desc' = 'desc';
  public limit = 12;
  public imgUrl = `${environment.MasterApi}/thumb-images/`;

  // exposed to template
  posts$!: Observable<Partial<PostDetails>[]>;
  pagination$!: Observable<Pagination>;
  loading$!: Observable<boolean>;
  isAdmin$!: Observable<boolean>;

  private destroy$ = new Subject<void>();
  private masonryInstance!: any;

  // drive everything from URL
  public currentPage = 1; // ← new
  public pageSizes = [12, 24, 48]; // optional preset page-size buttons

  // drive everything from URL
  private params$ = this.route.queryParams.pipe(
    map((p) => ({
      page: +p['page'] || 1,
      limit: +p['limit'] || this.limit,
      search: p['search'] || this.search,
      sortBy: p['sortBy'] || this.sortBy,
      order: p['order'] || this.order,
    })),
    tap((p) => {
      // keep imperative props in sync so ngModel still works
      this.currentPage = p.page; // ← set here
      this.search = p.search;
      this.sortBy = p.sortBy as any;
      this.order = p.order as any;
      this.limit = p.limit;
    }),
    takeUntil(this.destroy$)
  );

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private postSvc: NewPostDetailService,
    private authSvc: AuthenticationService,
    private roleSvc: RoleService,
    @Inject(PLATFORM_ID) private platformId: Object,
    private cdr: ChangeDetectorRef,
    private renderer: Renderer2
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngOnInit(): void {
    // 1) Admin flag for “Edit” button
    this.isAdmin$ = this.authSvc.user$.pipe(
      switchMap((u) =>
        u
          ? this.roleSvc
              .getRoleById(u.role_id)
              .pipe(
                map((r) =>
                  ['owner', 'administrator'].includes(
                    r?.code.toLowerCase() ?? ''
                  )
                )
              )
          : [false]
      ),
      takeUntil(this.destroy$)
    );

    // 2) Fetch posts once per param-change, share result
    const sharedData$ = this.params$.pipe(
      switchMap(({ page, limit, search, sortBy, order }) =>
        this.postSvc.getMinimalPosts({ page, limit, search, sortBy, order })
      ),
      tap(() => this.cdr.markForCheck()),
      shareReplay({ bufferSize: 1, refCount: true })
    );

    // derive the three observables without re-triggering HTTP
    this.posts$ = sharedData$.pipe(
      map((resp: MinimalPostListResponse) => resp.posts.map((p) => ({ ...p })))
    );
    this.pagination$ = sharedData$.pipe(map((resp) => resp.pagination));
    // loading: true on params change, false once sharedData$ emits
    this.loading$ = this.params$.pipe(
      switchMap(() =>
        sharedData$.pipe(
          map(() => false),
          startWith(true)
        )
      )
    );
  }

  ngAfterViewInit(): void {
    if (this.isBrowser) {
      this.initMasonry();
      window.addEventListener('resize', this.initMasonry);
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    window.removeEventListener('resize', this.initMasonry);
  }

  changePage(page: number): void {
    if (page !== this.currentPage) {
      this.currentPage = page;
      this.updateUrl();
    }
  }

  changePageSize(limit: number): void {
    if (limit !== this.limit) {
      this.limit = limit;
      this.currentPage = 1;
      this.updateUrl();
    }
  }
  private updateUrl(): void {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {
        page: this.currentPage,
        limit: this.limit,
        search: this.search,
        sortBy: this.sortBy,
        order: this.order,
      },
      queryParamsHandling: 'merge',
    });
  }

  navigateToEdit(postId: string): void {
    const extras: NavigationExtras = { queryParams: { img: postId } };
    const tree: UrlTree = this.router.createUrlTree(
      ['/images/post-generate'],
      extras
    );
    window.open(this.router.serializeUrl(tree), '_blank');
  }

  onSvgLoad(e: Event): void {
    const parent = (e.target as HTMLElement).parentElement;
    if (parent) {
      this.renderer.removeClass(parent, 'opacity-0');
      this.initMasonry();
      console.log('SVG loaded');
    }
  }

  private initMasonry(): void {
    this.masonryInstance = new Masonry(this.masonryGridRef.nativeElement, {
      itemSelector: '.masonry-box',
      percentPosition: true,
    });
  }
}
