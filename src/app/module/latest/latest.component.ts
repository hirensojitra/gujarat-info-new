import { isPlatformBrowser } from '@angular/common';
import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  Inject,
  PLATFORM_ID,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PostDetails } from 'src/app/common/interfaces/image-element';
import { AuthService } from 'src/app/common/services/auth.service';
import { ColorService } from 'src/app/common/services/color.service';
import { PlatformService } from 'src/app/common/services/platform.service';
import { PostDetailService } from 'src/app/common/services/post-detail.service';
import { environment } from 'src/environments/environment';
declare const Masonry: any;

@Component({
  selector: 'app-latest',
  templateUrl: './latest.component.html',
  styleUrl: './latest.component.scss',
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
  loading: boolean = false;
  progress: number = 0;

  @ViewChild('masonryGrid', { static: false }) masonryGridRef!: ElementRef;

  imgUrl = environment.MasterApi + '/thumb-images/';

  constructor(
    private PS: PostDetailService,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    @Inject(PLATFORM_ID) private platformId: Object,
    private cdr: ChangeDetectorRef,
    private platformService: PlatformService,
    private colorService: ColorService
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
      this.masonryInstance = new Masonry(this.masonryGridRef.nativeElement, {
        itemSelector: '.masonry-box',
        percentPosition: true,
      });
    }
  }

  private async getAllPosts(): Promise<void> {
    this.loading = true;
    this.progress = 0;

    this.PS.getAllPosts({
      page: this.currentPage,
      limit: this.limit,
      search: this.search,
      sortBy: this.sortBy,
      order: this.order,
    }).subscribe(async (response) => {
      const totalPosts = response.posts.filter(
        (post) => post?.info_show
      ).length;
      let processedCount = 0;
      this.posts = await Promise.all(
        response.posts.map(async (post) => {
          if (post?.info_show) {
            const imageUrl = this.imgUrl + post.id;
            post.image = await this.convertImageToDataURI(imageUrl);
            processedCount++;
            this.progress = Math.round((processedCount / totalPosts) * 100);
          }
          return post;
        })
      );
      this.pagination = response.pagination;
      this.loading = false;
      this.progress = 100;
      this.cdr.detectChanges();
      this.initializeMasonry();
    });
  }

  async convertImageToDataURI(imageUrl: string): Promise<string> {
    if (!this.isBrowser) {
      return imageUrl;
    }
    try {
      const response = await fetch(imageUrl, { mode: 'cors' });
      const blob = await response.blob();
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result as string);
        reader.onerror = reject;
        reader.readAsDataURL(blob);
      });
    } catch (error) {
      console.error('Error converting image to Data URI:', error);
      return '';
    }
  }

  async changePage(page: number): Promise<void> {
    if (this.currentPage !== page) {
      this.currentPage = page;
      this.progress = 0;
      this.loading = true;
      await this.updateUrlParams();
    }
  }

  async changePageSize(newLimit: number): Promise<void> {
    if (this.limit !== newLimit) {
      this.limit = newLimit;
      this.currentPage = 1;
      this.progress = 0;
      this.loading = true;
      await this.updateUrlParams();
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
        order: this.order,
      },
      queryParamsHandling: 'merge',
    });
  }

  isAdmin(): boolean {
    return this.authService.hasRole(['admin', 'master']);
  }

  onSvgLoad(post: PostDetails, event?: Event): void {
    if (this.masonryInstance && this.isBrowser) {
      window.dispatchEvent(new Event('resize'));
    }

    // Parent element of the SVG
    const parentElement = (event?.target as SVGElement)?.parentElement;
    const imageUrl = post.image; // post.image is already the Data URI now
    if (imageUrl && parentElement) {
      this.getColors(imageUrl, 5)
        .then((colors) => {
          if (colors.length > 0) {
            parentElement.style.backgroundColor = colors[2];
          }
        })
        .catch((error) => {
          console.error('Failed to fetch colors:', error);
        });
    }
  }

  async getColors(image: string, colorCounts: number) {
    try {
      return await this.colorService.getColors(image, colorCounts);
    } catch (error) {
      console.error('Error updating colors:', error);
      return [];
    }
  }
}
