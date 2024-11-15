import {
  AfterViewInit,
  Component,
  OnInit,
  Inject,
  PLATFORM_ID,
  Optional
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { ActivatedRoute, NavigationExtras, Router, UrlTree } from '@angular/router';
import { PostDetails } from 'src/app/common/interfaces/image-element';
import { AuthService } from 'src/app/common/services/auth.service';
import { PostDetailService } from 'src/app/common/services/post-detail.service';
import { PlatformService } from 'src/app/common/services/platform.service';
declare const Masonry: any;
@Component({
  selector: 'app-image-list',
  templateUrl: './image-list.component.html',
  styleUrls: ['./image-list.component.scss']
})
export class ImageListComponent implements OnInit, AfterViewInit {
  posts: PostDetails[] = [];
  imageUrls: string[] = [];
  currentPage: number = 1;
  totalPages: number = 0;
  totalLength: number = 0;
  isBrowser: boolean;
  deviceId: string | null = null;
  private masonryInstance: any;
  constructor(
    private PS: PostDetailService,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    @Inject(PLATFORM_ID) private platformId: Object,
    private platformService: PlatformService
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);

    this.loadDeviceId();
  }
  deviceFingerprint: any;
  deviceInfo: any;
  async ngOnInit(): Promise<void> {
    if (this.isBrowser) {
      // Dynamically load ngx-masonry only in the browser
      const masonryModule = await import('ngx-masonry');
      // You can use masonryModule.NgxMasonryModule as needed
    }

    this.route.queryParams.subscribe((params) => {
      this.currentPage = +params['page'] || 1;
      this.getAllPosts();
      this.getTotalPostLength();
    });
    this.deviceFingerprint = await this.platformService.getDeviceFingerprint();
    console.log('Device Fingerprint Information:', this.deviceFingerprint);
    this.deviceInfo = this.platformService.getDeviceInfo();
    console.log('Device Information:', this.deviceInfo);
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      if (this.isBrowser) {
        const masonryGrid = document.getElementById("masonry-grid");
        this.masonryInstance = new Masonry(masonryGrid, {
          itemSelector: '.masonry-box',
          percentPosition: true
        });
      };
    }, 1500);
  }
  private async loadDeviceId(): Promise<void> {
    if (this.isBrowser) {
      this.deviceId = await this.platformService.getDeviceId();
      console.log('Device ID:', this.deviceId);
    }
  }
  getAllPosts(): void {
    this.PS.getAllPosts(this.currentPage).subscribe((posts) => {
      this.posts = posts;
      this.generateImageUrls();
    });
  }

  generateImageUrls(): void {
    this.imageUrls = this.posts.map(() => this.getRandomImage(1080, 1920));
  }

  getTotalPostLength(): void {
    this.PS.getTotalPostLength().subscribe((data) => {
      this.totalLength = data.totalLength;
      this.calculateTotalPages();
    });
  }

  calculateTotalPages(): void {
    const postLimitPerPage = 12;
    this.totalPages = Math.ceil(this.totalLength / postLimitPerPage);
  }

  onPageChange(pageNumber: number): void {
    if (this.currentPage === pageNumber) return;
    this.currentPage = pageNumber;
    this.updateUrlParams();
  }

  getPaginationControls(): number[] {
    return Array.from({ length: this.totalPages }, (_, index) => index + 1);
  }

  updateUrlParams(): void {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { page: this.currentPage },
      queryParamsHandling: 'merge'
    });
  }

  isAdmin(): boolean {
    return this.authService.hasRole(['admin', 'master']);
  }

  getRandomImage(min: number, max: number): string {
    return (
      'https://dummyimage.com/' +
      (Math.floor(Math.random() * (max - min + 1)) + min) +
      'x' +
      (Math.floor(Math.random() * (max - min + 1)) + min) +
      '/F5F5F5/000'
    );
  }
  onSvgLoad(): void {
    // Call layout on Masonry instance to update the grid
    if (this.masonryInstance) {
      this.masonryInstance.layout();
    }
  }
  navigateToEdit(postId: string): void {
    const navigationExtras: NavigationExtras = {
      queryParams: { img: postId }
    };

    // Generate the URL using the Angular Router's `createUrlTree`
    const urlTree: UrlTree = this.router.createUrlTree(['/images/generate'], navigationExtras);
    const url: string = this.router.serializeUrl(urlTree);

    // Open the URL in a new tab or window
    window.open(url, '_blank');
  }
}
