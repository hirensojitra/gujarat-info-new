import { isPlatformBrowser } from '@angular/common';
import { ChangeDetectorRef, Component, ElementRef, Inject, PLATFORM_ID, ViewChild } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router, UrlTree } from '@angular/router';
import { PostDetails } from 'src/app/common/interfaces/image-element';
import { AuthService } from 'src/app/common/services/auth.service';
import { PlatformService } from 'src/app/common/services/platform.service';
import { PostDetailService } from 'src/app/common/services/post-detail.service';
declare const Masonry: any;
@Component({
  selector: 'app-latest',
  templateUrl: './latest.component.html',
  styleUrl: './latest.component.scss'
})
export class LatestComponent {
  posts: PostDetails[] = [];
  currentPage: number = 1;
  limit: number = 12;
  search: string = '';
  sortBy: string = 'created_at';
  order: string = 'desc';
  pagination: any = { totalPosts: 0, currentPage: 1, totalPages: 0 };
  isBrowser: boolean;
  private masonryInstance: any;

  @ViewChild('masonryGrid', { static: false }) masonryGridRef!: ElementRef;

  constructor(
    private PS: PostDetailService,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    @Inject(PLATFORM_ID) private platformId: Object,
    private cdr: ChangeDetectorRef,
    private platformService: PlatformService
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  async ngOnInit(): Promise<void> {
    this.route.queryParams.subscribe(async (params) => {
      this.currentPage = +params['page'] || 1;
      this.limit = +params['limit'] || this.limit;
      this.search = params['search'] || this.search;
      this.sortBy = params['sortBy'] || this.sortBy;
      this.order = params['order'] || this.order;
      await this.getAllPosts();
    });
  }

  ngAfterViewInit(): void {
    if (this.isBrowser) {
      this.initializeMasonry();
      window.addEventListener('resize', () => {
        if (this.masonryInstance) {
          this.masonryInstance.layout();
        }
      });
    }
  }

  private initializeMasonry(): void {
    if (this.masonryGridRef && this.isBrowser) {
      console.log('Initializing Masonry:', this.masonryGridRef.nativeElement);
      this.masonryInstance = new Masonry(this.masonryGridRef.nativeElement, {
        itemSelector: '.masonry-box',
        percentPosition: true,
      });
    }
  }
  deviceId: any;
  private async loadDeviceId(): Promise<void> {
    if (this.isBrowser) {
      this.deviceId = await this.platformService.getDeviceId();
      console.log('Device ID:', this.deviceId);
    }
  }

  private async getAllPosts(): Promise<void> {
    this.PS.getAllPosts({
      page: this.currentPage,
      limit: this.limit,
      search: this.search,
      sortBy: this.sortBy,
      order: this.order,
    }).subscribe((response) => {
      this.posts = response.posts;
      this.pagination = response.pagination;

      // Trigger DOM updates and Masonry initialization
      this.cdr.detectChanges();
      setTimeout(() => {
        if (this.masonryInstance) {
          this.masonryInstance.reloadItems();
          this.masonryInstance.layout();
        } else {
          this.initializeMasonry();
        }
      }, 100);
    });
  }

  changePage(page: number): void {
    if (this.currentPage != page) {
      this.currentPage = page;
      this.updateUrlParams();
      this.getAllPosts();
    }
  }

  changePageSize(newLimit: number): void {
    if (this.limit != newLimit) {
      this.limit = newLimit;
      this.currentPage = 1;
      this.updateUrlParams();
      this.getAllPosts();
    }
  }

  updateUrlParams(): void {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {
        page: this.currentPage,
        limit: this.limit,
        search: this.search,
        sortBy: this.sortBy,
        order: this.order
      },
      queryParamsHandling: 'merge'
    });
  }

  isAdmin(): boolean {
    return this.authService.hasRole(['admin', 'master']);
  }
  onSvgLoad(): void {
    if (this.masonryInstance && this.isBrowser) {
      window.dispatchEvent(new Event('resize'));
    }
  }


}
